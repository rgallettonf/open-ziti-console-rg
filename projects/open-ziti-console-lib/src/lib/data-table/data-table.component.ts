import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

// Import the resized event model
import $ from 'jquery';
import _ from 'lodash';
import {TableFilterService} from "../services/table-filter.service";
import {TableHeaderSelectComponent} from "./table-header-select/table-header-select.component";
import {TableHeaderMenuComponent} from "./table-header-menu/table-header-menu.component";
import {TableCellSelectComponent} from "./table-cell-select/table-cell-select.component";
import {TableCellMenuComponent} from "./table-cell-menu/table-cell-menu.component";
import {TableHeaderDefaultComponent} from "./table-header-default/table-header-default.component";

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges, OnInit {
  @Input() rowData: any;
  @Input() expandRowData: any;
  @Input() collapseRowData: any;
  @Input() rowValidation: any;
  @Input() columnFilters: any;
  @Input() isTimeSearchAvailable: boolean;
  @Input() isLoading: any;
  @Input() tableId = '';
  @Input() options = {noSelect: false, noMenu: false};
  @Input() validateService: any;
  @Input() rowsToggled: any;
  @Input() tableRefreshCount: any;
  @Input() set view(value: any) {
    this._view = value;
  }
  @Input() serverSideDataSource: any;
  @Input() allowDownload: boolean;

  @Output() actionRequested = new EventEmitter<{ action: string; item?: any }>();
  @Output() filterChanged = new EventEmitter();
  @Output() gridReady = new EventEmitter();
  @Output() dragStart = new EventEmitter();
  @Output() dragLeave = new EventEmitter();
  @Output() pageChanged = new EventEmitter();

  _view = 'list';
  frameworkComponents;
  gridModules;
  gridOptions;
  visibleColumns;
  hiddenColumns;
  visibleColumnIds;
  hiddenColumnIds;
  mergedColumnDefinitions;
  openMenu;
  openHeaderMenu;
  menuLeft;
  menuTop;
  gridRendered;
  resizeGridColumnsDebounced;
  allToggled;
  selectedItem: any = {
    actionList: [],
  };
  showFilterOptions = false;
  filterOptions = [];
  appliedFilters = [];

  subTreeDataService;
  isServerSideGroup;
  getServerSideGroupKey;
  autoGroupColumnDef;
  getDataPath;

  public menuColumnDefinition = {
    colId: 'ziti-ag-menu',
    field: 'ziti-ag-menu',
    resizable: false,
    width: 50,
    sortable: false,
    lockPosition: true,
    suppressMovable: true,
    headerClass: 'menuHeader',
    cellClass: 'tCol cellMenu',
    cellRenderer: 'cellMenuComponent',
    cellRendererParams: {
      openMenu: ($event, item) => {
        this.openActionMenu($event, item);
      },
      closeMenu: (event) => {
        this.closeActionMenu();
      },
    },
    suppressSizeToFit: true,
    pinned: 'right',
    headerComponent: TableHeaderMenuComponent,
    headerComponentParams: {
      openHeaderMenu: ($event) => {
        this.openHeaderActionMenu($event);
      },
      closeMenu: (event) => {
        this.closeActionMenu();
      },
    },
  };
  private _initialColumnDefs;
  private _gridObj;
  private _refreshCellsDebounced;
  private _onColumnsResizedDebounced;
  private _saveColumnStateDebounced;

  private selectColumnDefinition = {
    colId: 'ziti-ag-selected',
    field: 'ziti-ag-selected',
    suppressSizeToFit: true,
    lockPosition: true,
    suppressMovable: true,
    resizable: false,
    pinned: 'left',
    width: 60,
    sortable: false,
    headerClass: 'selectHeader',
    cellClass: 'tCol',
    cellRenderer: 'cellSelectComponent',
    cellRendererParams: {
      toggleItem: (item) => {
        item.selected = !item.selected;
        this._gridObj.api.zitiAllToggled = _.every(this.rowData, {selected: true});
        _.defer(() => {
          this._gridObj.api.refreshCells({force: true});
        });
        this.actionRequested.emit({action: 'toggleItem', item: item});
      },
    },
    headerComponent: TableHeaderSelectComponent,
    headerComponentParams: {
      toggleAll: (selected: boolean) => {
        if (!this._gridObj) {
          return;
        }
        _.forEach(this.rowData, (row) => {
          row.selected = selected;
        });
        this.actionRequested.emit({action: 'toggleAll'});
        _.defer(() => {
          this._gridObj.api.refreshCells({force: true});
        });
      },
    },
  };

  constructor(private filterService: TableFilterService) {}

  private _columnDefinitions;

  get columnDefinitions(): any {
    return this._columnDefinitions;
  }

  @Input() set columnDefinitions(value: any) {
    this._columnDefinitions = value;

  }

  get showFilter(): boolean {
    return this._view !== 'upload' && this._view !== 'process';
  }

  @Input() set refreshCount(value: number) {
    if (!this._gridObj) {
      return;
    }
    _.defer(() => {
      this._gridObj.api.redrawRows();
      this._gridObj.api.refreshCells({force: true});
    });
  }

  ngOnInit() {
    this.frameworkComponents = {
      cellSelectComponent: TableCellSelectComponent,
      cellMenuComponent: TableCellMenuComponent,
      headerCellSelectComponent: TableHeaderSelectComponent,
      headerHeaderMenuComponent: TableHeaderMenuComponent,
      headerDefaultComponent: TableHeaderDefaultComponent,
    };
    this.resizeGridColumnsDebounced = _.debounce(this.resizeGridColumns.bind(this), 20, {leading: true});
    this._refreshCellsDebounced = _.debounce(this._refreshCells.bind(this), 50);
    this._onColumnsResizedDebounced = _.debounce(this._onColumnsResized.bind(this), 400);
    this._saveColumnStateDebounced = _.debounce(this._saveColumnState.bind(this), 400);
    this.isServerSideGroup = function (dataItem) {
      const isGroup = _.get(dataItem, 'processTree', []).length === 1;
      return isGroup;
    };
    this.getServerSideGroupKey = function (dataItem) {
      return dataItem.processId;
    };

    this.autoGroupColumnDef = {
      field: 'processTree',
      headerName: 'Process Name',
      cellRenderer: 'cellResourceStatusComponent',
      resizable: true,
      cellRendererParams: {resourceType: 'process-execution'},
      headerComponentFramework: TableHeaderDefaultComponent,
    };
    this.getDataPath = function (data) {
      return data.processTree;
    };
    if (this._columnDefinitions) {
      this._addColumnEvents();
      this._addDefaultColumnDefs();
      this._storeInitialColumnDefs();
      this._setColumnWidths();
      this._setColumnOrderAndVisibility();
      this._initColumnVisibility();
      this._initGridOptions();
    }
  }
  ngOnChanges(changes: any): void {
    if (this._gridObj && changes.rowData) {
      this._refreshCellsDebounced(changes.rowData);
    }
  }

  columnVisibilityChanged(event) {
    this.setColumnVisibilityColumn(event?.column, event?.visible);
  }

  setColumnVisibilityColumn(column, visible) {
    this._gridObj.columnApi.setColumnVisible(column.colId, visible);
    this._gridObj.api.refreshHeader();
    _.defer(() => {
      this._updateColumnVisibility(column.colId, visible);
    });
  }

  openActionMenu(event, item): void {
    this.selectedItem = item;
    this.openMenu = true;
    this.menuLeft = event.clientX - 150;
    this.menuTop = event.clientY + 5;
  }

  onGridReady(params) {
    this.gridReady.emit(params);
  }

  resetTableColumns() {
    if (!this._gridObj) {
      return;
    }
    this.mergedColumnDefinitions = _.cloneDeep(this._initialColumnDefs);
    this._gridObj.api.setColumnDefs(this.mergedColumnDefinitions);
    this._resetCookieConfig();
    this._gridObj.columnApi.resetColumnState();
    _.defer(() => {
      this._updateHiddenColumns();
      this.resizeGridColumns();
    });
  }

  applyFilter(event, filter) {
    const filterExists = _.some(this.appliedFilters, {columnId: filter.columnId});
    if (filterExists) {
      if (_.isEmpty(_.toString(filter.value))) {
        _.remove(this.appliedFilters, {columnId: filter.columnId});
      } else {
        this.appliedFilters = _.map(this.appliedFilters, (appliedFilter) => {
          if (appliedFilter.columnId === filter.columnId) {
            appliedFilter = filter;
          }
          return appliedFilter;
        });
      }
    } else if (!_.isEmpty(_.toString(filter.value))) {
      this.appliedFilters.push(filter);
    }
    _.set(this.columnFilters, filter.columnId, filter.value);
    this.filterChanged.emit({columnId: filter.columnId, value:  filter.value});

    this.closeHeaderFilter(event);
  }

  removeFilter(event) {
    this.filterChanged.emit({columnId: event.columnId});
    _.remove(this.appliedFilters, (filter) => filter.columnId === event.columnId);
  }

  openHeaderActionMenu(event): void {
    this.menuLeft = event.clientX - 150;
    this.menuTop = event.clientY + 5;
    _.delay(() => {
      this.openHeaderMenu = true;
    }, 100);
  }

  openHeaderFilter(event, options): void {
    this.filterOptions = options;
    this.menuLeft = event.clientX;
    this.menuTop = event.clientY + 10;
    this.showFilterOptions = true;
  }

  closeActionMenu(): void {
    this.selectedItem = {
      actionList: [],
    };
    this.openMenu = false;
    this.openHeaderMenu = false;
  }

  closeHeaderFilter(event): void {
    this.showFilterOptions = false;
  }

  resizeGridColumns(event = {}) {
    if (!this._gridObj) {
      return;
    }
    _.defer(() => {
      this._gridObj.api.sizeColumnsToFit();
    });
  }

  sortChanged(event) {
    event = undefined;
    return false;
  }

  anySelected() {
    return _.some(this.rowData, {selected: true});
  }

  showDownload() {
    return this.allowDownload && this._view !== 'process';
  }

  getRowNodeId(row) {
    return row?.data?.id ? row?.data?.id : row?.data?.name ? row?.data?.name : 'new_row_' + row?.data?.itemIndex;
  }

  _refreshCells(rowData) {
    if (!this._gridObj) {
      return;
    }
    const dataChanged = !_.isEqual(rowData.previousValue, rowData.currentValue);
    if (dataChanged) {
      this._gridObj.api.zitiAllToggled = !_.isEmpty(this.rowData) && _.every(this.rowData, {selected: true});
      this._gridObj.api.refreshCells({force: true});
    }
  }

  _initGridOptions() {
    this.gridOptions = {
      pagination: false,
      rowSelection: 'single',
      rowClass: 'ziti-table-row',
      rowHeight: 50,
      immutableData: true,
      suppressRowClickSelection: true,
      suppressHorizontalScroll: false,
      stopEditingWhenGridLosesFocus: true,
      suppressPropertyNamesCheck: true,
      animateRows: true,
      defaultColDef: {
        sortable: false,
        filter: true, // set filtering on for all columns
      },
      onRowDragMove: (params) => {
        this.dragStart.emit(params);
      },
      onRowDragLeave: (params) => {
        this.dragLeave.emit(params);
      },
      onRowDragEnd: () => {
        $('.attribute-item').show();
        $('.drag-hover').removeClass('drag-hover');
        $('#ColumnVisibilityHeader').trigger('click');
        $('.new-attribute-target').hide();
      },
      rowClassRules: {
        // row style function
        'row-invalid': function (params) {
          return _.get(params, 'data.invalid');
        },
        'row-copied': function (params) {
          return _.get(params, 'data.copied');
        },
        'row-child-sub-process': function (params) {
          return (
              params.api.view === 'process' &&
              !_.get(params, 'data.isRoot') &&
              !_.isEmpty(_.get(params, 'data.subprocessId'))
          );
        },
        'row-child': function (params) {
          return (
              (params.api.view === 'process' || params.api.view === 'user-roles') &&
              !_.get(params, 'data.isRoot') &&
              !_.isEmpty(_.get(params, 'data.parentId'))
          );
        },
        'row-child-second': function (params) {
          return (
              params.api.view === 'process' &&
              !_.get(params, 'data.isRoot') &&
              _.get(params, 'data.isParallel')
          );
        },
        'row-child-even': function (params) {
          return (
              (params.api.view === 'process' || params.api.view === 'user-roles') &&
              _.get(params, 'data.parentIndex') % 2 > 0
          );
        },
        'row-child-odd': function (params) {
          return (
              (params.api.view === 'process' || params.api.view === 'user-roles') &&
              _.get(params, 'data.parentIndex') % 2 === 0
          );
        },
        'row-child-warn': function (params) {
          return params.api.view === 'process' && _.get(params, 'data.state') === 'WARNING';
        },
        'row-child-header': function (params) {
          return params.api.view === 'process' && _.get(params, 'data.rowType') === 'step-header';
        },
        'row-role-item': function (params) {
          return _.get(params, 'data.roleItem');
        },
      },
      getRowHeight: (params) => {
        if (params.api.view === 'process') {
          if (_.get(params, 'data.isRoot')) {
            return 50;
          }
          if (_.get(params, 'data.isParallel')) {
            return 35;
          }
          if (_.get(params, 'data.parentId')) {
            return 40;
          }
          return 50;
        } else if (
            params.api.view === 'users' ||
            params.api.view === 'user-roles' ||
            params.api.view === 'roles'
        ) {
          if (_.get(params, 'data.roleItem')) {
            return 35;
          }
          return 50;
        } else {
          return 50;
        }
      },

      onCellEditingStopped: (eventObj) => {
        if (!this.validateService) {
          return;
        }
        const field = _.get(eventObj, 'colDef.field', '');
        if (_.includes(field.toLowerCase(), 'attribute')) {
          const newVal = eventObj.newValue.split(',');
          _.set(eventObj, `data.${field}`, newVal);
        } else {
          _.set(eventObj, `data.${field}`, eventObj.newValue);
        }
        this._validateTable(eventObj);
      },
      getRowNodeId: (data) => data.name,
      onBodyScroll: (scroller) => {
        this._handleTableScroll(scroller);
      },
      onGridReady: (grid) => {
        grid.api.zitiAllToggled = false;
        grid.api.zitiHideColumn = this.setColumnVisibilityColumn.bind(this);
        grid.api.zitiApplyFilter = this.applyFilter.bind(this);
        grid.api.columnFilters = this.columnFilters;
        grid.api.openHeaderFilter = this.openHeaderFilter.bind(this);
        grid.api.closeHeaderFilter = this.closeHeaderFilter.bind(this);
        grid.api.validateTable = this._validateTable.bind(this);
        grid.api.view = this._view;
        grid.api.zitiRowData = this.rowData;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        grid.api.rowsToggled = this.rowsToggled ? this.rowsToggled.bind(this) : () => {};
        if (this.serverSideDataSource) {
          grid.api.setServerSideDatasource(this.serverSideDataSource);
        }
        this._gridObj = grid;
        _.defer(this._applyColumnState.bind(this));
      },
      onColumnVisible: (eventObj) => {
        if (!eventObj.column) {
          return;
        }
        this._updateColumnVisibility(eventObj.column.colDef.colId, eventObj.visible);
        if (eventObj.visible) {
          this._gridObj.columnApi.moveColumn(
              eventObj.column.colDef.colId,
              this.mergedColumnDefinitions.length - 1
          );
          _.defer(() => {
            this._gridObj.api.ensureColumnVisible(eventObj.column.colDef.colId);
          });
        }
        this._updateGridColumns();
        this._saveColumnState();
      },
      onFirstDataRendered: (eventObj) => {
        this.resizeGridColumns();
        this.gridRendered = true;
      },
      onColumnPinned: (eventObj) => {
        if (!eventObj.column) {
          return;
        }
        const colId = eventObj.column.colDef.colId;
        const pinned = eventObj.pinned === 'left';
        this.mergedColumnDefinitions = _.map(this.mergedColumnDefinitions, (colDef) => {
          if (colDef.colId === colId) {
            colDef.lockPosition = pinned;
            colDef.suppressMovable = pinned;
          }
          return colDef;
        });
        this._updateGridColumns();
        this.resizeGridColumns();
        this._saveColumnState();
      },
      onColumnResized: (eventObj) => {
        if (!eventObj.column || eventObj.source === 'sizeColumnsToFit') {
          return;
        }
        this._onColumnsResizedDebounced(eventObj.column);
      },
      onColumnMoved: (eventObj) => {
        this._saveColumnStateDebounced();
      },
    };
  }

  _validateTable(eventObj) {
    this.rowData[eventObj.rowIndex] = eventObj.data;
    _.delay(() => {
      this.validateService(this.rowData);
      _.delay(() => {
        this._gridObj.api.refreshCells({force: true});
        this._gridObj.api.redrawRows();
      }, 50);
    }, 50);
  }

  _onColumnsResized(column) {
    this._saveColumnWidths(column);
  }

  _resetCookieConfig() {
    localStorage.removeItem(`ziti_${this.tableId}_table_state`);
    localStorage.removeItem(`ziti_${this.tableId}_column_widths`);
  }

  _saveColumnState() {
    const tableState = this._gridObj.columnApi.getColumnState();
    const tableStateCookie = JSON.stringify(tableState);
    localStorage.setItem(`ziti_${this.tableId}_table_state`, tableStateCookie);
  }

  _applyColumnState() {
    const tableStateCookie = localStorage.getItem(`ziti_${this.tableId}_table_state`);
    const tableState = JSON.parse(tableStateCookie);
    if (tableState) {
      this._gridObj.columnApi.applyColumnState({state: tableState});
      this._updateHiddenColumns();
    }
  }

  _saveColumnWidths(column) {
    if (!column) {
      return;
    }
    const columnId = column.colId;
    const columnWidth = column.actualWidth;
    let colWidthsCookie = localStorage.getItem(`ziti_${this.tableId}_column_widths`);
    let colWidths: any = {};
    if (!_.isEmpty(colWidthsCookie)) {
      colWidths = JSON.parse(colWidthsCookie);
    }
    colWidths[columnId] = columnWidth;
    colWidthsCookie = JSON.stringify(colWidths);
    localStorage.setItem(`ziti_${this.tableId}_column_widths`, colWidthsCookie);

    let tableStateCookie = localStorage.getItem(`ziti_${this.tableId}_table_state`);
    let tableState;
    if (_.isEmpty(tableStateCookie)) {
      tableState = this._gridObj.columnApi.getColumnState();
    } else {
      tableState = JSON.parse(tableStateCookie);
    }
    _.forEach(tableState, (column) => {
      if (columnId === column.colId) {
        column.suppressSizeToFit = true;
        column.width = columnWidth;
      }
    });
    tableStateCookie = JSON.stringify(tableState);
    localStorage.setItem(`ziti_${this.tableId}_table_state`, tableStateCookie);
    _.forEach(this._gridObj.columnApi.columnModel.columnDefs, (colDef) => {
      if (colDef.colId === columnId) {
        colDef.suppressSizeToFit = true;
      }
    });
  }

  _addColumnEvents() {
    this._columnDefinitions = _.map(this._columnDefinitions, (colDef) => {
      colDef.pinColumn = this._pinColumn.bind(this);
      colDef.cellClass = this._getCellStyle.bind(this);
      return colDef;
    });
  }

  _getCellStyle(params) {
    if (!this.rowValidation || this.rowValidation.length <= 0) {
      return '';
    }
    const validationResult = this.rowValidation[params.node.rowIndex];
    if (!validationResult || !validationResult.errors) {
      return '';
    }
    const field = _.get(params, 'colDef.field', '');
    if (validationResult.errors[field]) {
      return 'ziti-table-cell-error';
    }
    return '';
  }

  _pinColumn(column, pinned) {
    this._gridObj.columnApi.setColumnPinned(column, pinned);
  }

  _updateColumnVisibility(colId, visible) {
    this._columnDefinitions = _.map(this._columnDefinitions, (colDef) => {
      if (colDef.colId === colId) {
        colDef.hide = !visible;
      }
      return colDef;
    });
    for (const colDef of this.mergedColumnDefinitions) {
      if (colDef.colId === colId) {
        colDef.hide = !visible;
      }
    }
    this._updateHiddenColumns();
    this.resizeGridColumns();
  }

  _updateHiddenColumns() {
    const gridColumnDefs = this._gridObj.columnApi.columnModel.gridColumns;
    const visibleGridColumns = gridColumnDefs.filter((col) => col.visible);
    const hiddenGridColumns = gridColumnDefs.filter((col) => !col.visible);
    this.visibleColumns = _.map(visibleGridColumns, 'colDef');
    this.visibleColumnIds = _.map(this.visibleColumns, 'field');
    this.hiddenColumns = _.map(hiddenGridColumns, 'colDef');
    this.hiddenColumnIds = _.map(this.hiddenColumns, 'field');
  }

  _addDefaultColumnDefs() {
    this._addHeaderMenu(this._columnDefinitions);
    this.mergedColumnDefinitions = _.cloneDeep(this._columnDefinitions);
    if (this._view === 'process') {
      const cellParams = _.cloneDeep(this.menuColumnDefinition.cellRendererParams);
      const mergedParams = _.merge(
          this.mergedColumnDefinitions[this.mergedColumnDefinitions.length - 1].cellRendererParams,
          cellParams
      );
      this.mergedColumnDefinitions[this.mergedColumnDefinitions.length - 1].cellRendererParams = mergedParams;
      this.mergedColumnDefinitions[this.mergedColumnDefinitions.length - 1].headerComponentParams =
          this.menuColumnDefinition.headerComponentParams;
    } else if ( (this.options.noSelect && this.options.noMenu)) {
      // Don't add any additonal columns
    } else if (this._view !== 'upload') {
      this.mergedColumnDefinitions.splice(0, 0, this.selectColumnDefinition);
      this.mergedColumnDefinitions.push(this.menuColumnDefinition);
    }
  }

  _addHeaderMenu(columndDefs = []) {
    columndDefs.forEach((columnDef) => {
      if (columnDef.useHeaderMenu) {
        columnDef.headerComponentParams = {
          openHeaderMenu: ($event) => {
            this.openHeaderActionMenu($event);
          },
          closeMenu: (event) => {
            this.closeActionMenu();
          },
        };
      }
    });
  }

  _storeInitialColumnDefs() {
    this._initialColumnDefs = _.cloneDeep(this.mergedColumnDefinitions);
  }

  _initColumnVisibility() {
    this.visibleColumns = this._columnDefinitions.filter((col) => !col.hide);
    this.hiddenColumns = this._columnDefinitions.filter((col) => col.hide);
    this.visibleColumnIds = _.map(this.visibleColumns, 'field');
  }

  _updateGridColumns() {
    // this._addDefaultColumnDefs();
    this._setColumnWidths();
    this._gridObj.api.setColumnDefs(this.mergedColumnDefinitions);
    this._gridObj.api.refreshHeader();
  }

  _setColumnWidths() {
    if (this._view === 'upload' || this._view === 'process') {
      return;
    }
    const colWidthsCookie = localStorage.getItem(`ziti_${this.tableId}_column_widths`);
    if (!_.isEmpty(colWidthsCookie)) {
      const colWidths = JSON.parse(colWidthsCookie);
      _.forEach(colWidths, (colWidth, colId) => {
        _.forEach(this.mergedColumnDefinitions, (colDef) => {
          if (colDef.colId === colId) {
            colDef.width = colWidth;
            colDef.suppressSizeToFit = true;
          }
        });
      });
    }
  }

  _setColumnOrderAndVisibility() {
    if (this._view === 'upload' || this._view === 'process') {
      return;
    }
    const tableStateCookie = localStorage.getItem(`ziti_${this.tableId}_table_state`);
    if (!_.isEmpty(tableStateCookie) || typeof tableStateCookie === 'undefined') {
      const colStates = JSON.parse(tableStateCookie);
      const columnIndexes = [];
      _.forEach(colStates, (colState) => {
        _.forEach(this.mergedColumnDefinitions, (colDef) => {
          if (colDef.colId === colState.colId) {
            columnIndexes.push(colDef);
            colDef.hide = colState.hide;
          }
        });
      });
      _.forEach(this.mergedColumnDefinitions, (colDef) => {
        let colFound = false;
        _.forEach(columnIndexes, (colIndex) => {
          if (colDef.colId === colIndex.colId) {
            colFound = true;
          }
        });
        if (!colFound) {
          columnIndexes.push(colDef);
        }
      });
      this.mergedColumnDefinitions = columnIndexes;
    }
  }

  _handleTableScroll(scroller): void {
    const scrollWidth = $('.ag-center-cols-container').width();
    const viewWidth = $('.ag-center-cols-viewport').width();
    const scrollableWidth = scrollWidth - viewWidth;
    if (scroller.left > 0) {
      $('.ag-pinned-left-cols-container').addClass('ag-pinned-left-shadow');
    } else {
      $('.ag-pinned-left-cols-container').removeClass('ag-pinned-left-shadow');
    }
    if (scroller.left < scrollableWidth - 2) {
      $('.ag-pinned-right-cols-container').addClass('ag-pinned-right-shadow');
    } else {
      $('.ag-pinned-right-cols-container').removeClass('ag-pinned-right-shadow');
    }
  }
}
