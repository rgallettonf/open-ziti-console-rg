import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ObjectComponent} from "../features/dynamic-widgets/object/object.component";
import {NumberComponent} from "../features/dynamic-widgets/number/number.component";
import {BooleanComponent} from "../features/dynamic-widgets/boolean/boolean.component";
import {StringComponent} from "../features/dynamic-widgets/string/string.component";
import {SelectorComponent} from "../features/dynamic-widgets/selector/selector.component";
import _ from "lodash";
import {TextListComponent} from "../features/dynamic-widgets/text-list/text-list.component";
import {CheckboxListComponent} from "../features/dynamic-widgets/checkbox-list/checkbox-list.component";

@Injectable({
    providedIn: 'root'
})
export class SchemaService {
    data = {};
    formId = null;
    value = {};
    codeView = null;
    timeoutId = null;
    suggesting = null;
    suggestId: any = null;
    suggestingField = "";
    private items: any[] = [];
    private bColorArray: string[] = [];
    private lColorArray: string[] = [];

    constructor() {
    }

    init(formId: string, codeId: string) {
        // schema.formId = formId;
        // if (codeId) {
        //     schema.codeView = CodeMirror.fromTextArea(document.getElementById(codeId), {
        //         mode: "application/json",
        //         lineNumbers: true,
        //         extraKeys: {"Ctrl-Space": "autocomplete"}
        //     });
        //     schema.codeView.setSize(null, 260);
        //     schema.codeView.on('keyup', () => {
        //         if (schema.timeoutId) clearTimeout(schema.timeoutId);
        //         schema.timeoutId = setTimeout(() => {
        //             schema.updateForm(JSON.parse(schema.codeView.getValue()));
        //         }, 1000);
        //     });
        // }
    }

    events() {
        // $('.arrayEntry').keyup(schema.addArray);
        // $('.arrayEntry').blur(schema.addBlurArray);
        // $(".toggle").off("click");
        // $(".toggle").on("click", schema.toggle);
        // $(".check").click(app.check);
        // $(".subobject").click(schema.subobject);
        // $("input[data-suggest]").keyup(schema.suggest);
    }

    toggle(e: any) {
        // let id = $(e.currentTarget).attr("id");
        // if ($(e.currentTarget).hasClass("on")) {
        //     $(e.currentTarget).removeClass("on");
        //     if (id) {
        //         $("." + id + "_area").hide();
        //         $("#" + id.split("forward").join("").toLowerCase()).prop("disabled", false);
        //     }
        // } else {
        //     $(e.currentTarget).addClass("on");
        //     if (id) {
        //         $("." + id + "_area").show();
        //         $("#" + id.split("forward").join("").toLowerCase()).prop("disabled", true);
        //         if ($("#" + id.split("forward").join("").toLowerCase()).prop('nodeName') == "INPUT") $("#" + id.split("forward").join("").toLowerCase()).val("");
        //     }
        // }
    }

    suggest(e: any) {
        // let element = $(e.currentTarget);
        // schema.suggestingField = element.attr("id");
        // let suggestionSource = element.data("suggest");
        // schema.suggesting = new Data(suggestionSource);
        // schema.suggesting.closeModals = false;
        // schema.suggesting.init(false, false, false);
        // context.removeListener(suggestionSource);
        // context.addListener(suggestionSource, schema.suggestLoaded);
        //
        // if (this.suggestId) clearTimeout(this.suggestId);
        //
        // schema.suggesting.paging.filter = element.val();
        // if (e.keyCode == 13) {
        //     schema.suggesting.get();
        // } else {
        //     this.suggestId = setTimeout(schema.suggesting.get.bind(schema.suggesting), 500);
        // }
    }

    suggestLoaded(e: any) {
        // let list = $("#" + schema.suggestingField + "_Suggestions");
        // list.html("");
        // if (e.data.length > 0) {
        //     for (let i = 0; i < e.data.length; i++) {
        //         list.append('<div class="suggestItem" data-field="' + schema.suggestingField + '">' + e.data[i].name + '</div>');
        //     }
        //     list.addClass("open");
        //     $(".suggestItem").click((e: any) => {
        //         let suggested = $(e.currentTarget);
        //         $("#" + suggested.data("field")).val(suggested.html());
        //         $("#" + schema.suggestingField + "_Suggestions").removeClass("open");
        //         $("#" + schema.suggestingField + "_Suggestions").html("");
        //     });
        // } else {
        //     list.removeClass("open");
        // }
    }

    removeMe(e: any) {
        // $(e.currentTarget).remove();
    }

    subobject(e: any) {
        // let obj = $(e.currentTarget);
        // let id = obj.data("id");
        // let to = obj.data("to");
        // let vals = obj.data("values").split(',');
        // let val = "";
        // let types = [];
        // for (let i = 0; i < vals.length; i++) {
        //     val += ((i > 0) ? "" : "") + vals[i] + ": " + $("#" + id + "_" + vals[i]).val();
        //     $("#" + id + "_" + vals[i]).val("");
        //     if ($("#" + id + "_" + vals[i]).attr('type') == "number") {
        //         types.push("number");
        //     } else {
        //         types.push("string");
        //     }
        // }
        // let element = $('<div class="tag obj" data-types="' + types.toString() + '">' + val + '</div>');
        // element.click(schema.removeMe);
        // $("#" + to).append(element);
    }

    addBlurArray(e: any) {
        // let id = $(e.currentTarget).prop("id");
        // let val = $(e.currentTarget).val().split('').join('').trim();
        // if (val.length > 0) {
        //     let element = $('<div class="tag">' + val + '</div>');
        //     element.click(schema.removeMe);
        //     $("#" + id + "_selected").append(element);
        //     $(e.currentTarget).val("");
        // }
    }

    addArray(e: any) {
        // if (e.keyCode == 188 || e.keyCode == 13) {
        //     let id = $(e.currentTarget).prop("id");
        //     let val = $(e.currentTarget).val().split('').join('').trim();
        //     if (val.length > 0) {
        //         let element = $('<div class="tag">' + val + '</div>');
        //         element.click(schema.removeMe);
        //         $("#" + id + "_selected").append(element);
        //         $(e.currentTarget).val("");
        //     }
        // }
    }

    getType(property: any) {
        if (property.type == "boolean") return property.type;
        else {
            if (property.enum != null) return "string";
            else {
                if (property.type) return property.type;
                else {
                    if (property.allOf && property.allOf.length > 0) {
                        return property.allOf[0].type;
                    } else {
                        return "string";
                    }
                }
            }
        }
    }

    addField(view: ViewContainerRef, key: string, property: any, nestLevel: number, parentKey?: string) {
        const type = this.getType(property);
        let componentRef:ComponentRef<any> | null = null;
        if (type == "object") {
            if (property.properties != null) {
                componentRef = this.buildNestedContainer(view, key, parentKey, nestLevel, property);
            }
        } else if (type == "integer") {
            componentRef = this.buildNumericField(view, key, property);
        } else if (type == "array") {
            let items: any = {};
            if (property.allOf && property.allOf.length >= 2) items = property.allOf[1];
            if (property.items) items = property.items;
            if (items.items) items = items.items;

            // if (items.type && items.type == "object" && items.properties != null) {
            //     let properties = items.properties;
            //     html += '<div id="' + ((parentKey != null) ? parentKey + '_' : '') + 'schema_' + key + '_selected" class="selectedItems"></div>';
            //     html += '<div class="subform">';
            //     let values = [];
            //     if (key == "portRanges" || key == "allowedPortRanges") html += '<div class="grid splitadd">';
            //     let order = ['low', 'high'];
            //     let subItems = [];
            //     for (let subKey in properties) {
            //         subItems.push({
            //             key: key,
            //             subKey: subKey,
            //             value: properties[subKey]
            //         });
            //     }
            //     subItems.sort(function (a, b) {
            //         let aPort = a.subKey.replace(/[^A-Za-z]+/g, '').toLowerCase().replace(/\s/g, '');
            //         let bPort = b.subKey.replace(/[^A-Za-z]+/g, '').toLowerCase().replace(/\s/g, '');
            //         return order.indexOf(aPort) - order.indexOf(bPort);
            //     });
            //     for (let i = 0; i < subItems.length; i++) {
            //         values.push(subItems[i].subKey);
            //         html += this.getField(subItems[i].subKey, subItems[i].value, subItems[i].key);
            //     }
            //     html += '<div><div id="' + ((parentKey != null) ? parentKey + '_' : '') + 'schema_' + key + '_Button" class="button subobject" data-id="' + key + '_schema" data-to="' + ((parentKey != null) ? parentKey + '_' : '') + 'schema_' + key + '_selected" data-values="' + values.toString() + '">Add</div></div>'
            //     if (key == "portRanges") html += '</div>';
            //     html += '</div></div>';
            // } else
                if (Array.isArray(items.enum)) {
                    // html += '<div id="' + ((parentKey != null) ? parentKey + '_' : '') + 'schema_' + key + '" data-total="' + items.enum.length + '" class="checkboxList">';
                    // for (let i = 0; i < items.enum.length; i++) {
                    //     html += '<label><div id="' + ((parentKey != null) ? parentKey + '_' : '') + 'schema_' + key + '_' + i + '" data-value="' + items.enum[i] + '" class="check"></div> ' + items.enum[i] + '</label>';
                    // }
                    // html += '</div></div>';
                    componentRef = this.buildCheckBoxListField(view, key, items.enum);

                } else {
                    // html += '<div id="' + ((parentKey != null) ? parentKey + '_' : '') + 'schema_' + key + '_selected" class="selectedItems"></div>';
                    // html += '<input id="' + ((parentKey != null) ? parentKey + '_' : '') + 'schema_' + key + '" type="text" class="jsonEntry arrayEntry" placeholder="enter values seperated with a comma"/></div>';
                    componentRef = this.buildTextListField(view, key);
                }
        } else if (type == "boolean") {
            componentRef = this.buildBooleanField(view, key);

            // html = '<div>' + html;
            // html += '<div id="schema_' + key + '" class="toggle"><div class="switch"></div><div class="label"></div></div></div>';
            // if (key == "dialInterceptedAddress") {
            //     html += '<div class="schema_dialInterceptedAddress_area" style="display:none">';
            //     html += '<label for="schema_' + key + '_allowedAddresses">Forward Addresses</label>';
            //     html += '<div id="schema_' + key + '_allowedAddresses_selected" class="selectedItems"></div>';
            //     html += '<input id="schema_' + key + '_allowedAddresses" type="text" class="jsonEntry arrayEntry" placeholder="enter values seperated with a comma"/></div>';
            //     html += "</div>";
            // }
            // if (key == "dialInterceptedPort") {
            //     html += '<div class="schema_dialInterceptedPort_area" style="display:none">';
            //     html += '<label for="schema_' + key + '_allowedPorts">Forward Port Ranges</label>';
            //     html += '<div id="schema_' + key + '_allowedPorts_selected" class="selectedItems"></div>';
            //
            //     html += '<div class="subform"><div class="grid splitadd">';
            //     html += '<div><label for="">High</label>';
            //     html += '<input id="schema_' + key + '_allowedPorts_high" type="text" class="jsonEntry" placeholder="enter the value"/></div>';
            //     html += '<div><label for="">Low</label>';
            //     html += '<input id="schema_' + key + '_allowedPorts_low" type="text" class="jsonEntry" placeholder="enter the value"/></div>';
            //     html += '<lab><div id="' + key + '_Button" class="button subobject" data-id="schema_' + key + '_allowedPorts" data-to="schema_' + key + '_allowedPorts_selected" data-types="number,number" data-values="high,low">Add</div></label>'
            //     html += '</div></div></div>';
            // }
            // if (key == "dialInterceptedProtocol") {
            //     html += '<div class="schema_dialInterceptedProtocol_area" style="display:none">';
            //     html += '<label for="schema_' + key + '_allowedProtocols">Forward Protocols</label>';
            //     html += '<div id="schema_' + key + '_allowedProtocols_selected" class="selectedItems"></div>';
            //     html += '<input id="schema_' + key + '_allowedProtocols" type="text" class="jsonEntry arrayEntry" placeholder="enter values seperated with a comma"/></div>';
            //     html += "</div>";
            // }
        }  else if (property.enum && property.enum.length > 0) {
            componentRef = this.buildSelectField(view, key, property.enum);

        }  else if (type == "string") {
            componentRef = this.buildTextField(view, key);
        }
        return componentRef;
    }

    private buildNestedContainer(view: ViewContainerRef, key: string, parentKey: string | undefined, nestLevel: number, property: any) {
        let componentRef = view.createComponent(ObjectComponent);
        componentRef.setInput('fieldName', this.getLabel(key));
        if (parentKey && !_.isEmpty(parentKey)) componentRef.setInput('parentName', parentKey.toLowerCase());
        componentRef.setInput('bcolor', this.bColorArray[nestLevel]);
        const embeddedView = componentRef.instance.wrapperContents;
        this.addFields(property, embeddedView, nestLevel++);
        return componentRef;
    }

    private buildBooleanField(view: ViewContainerRef, key: string, parentKey?: string) {
        let componentRef = view.createComponent(BooleanComponent);
        componentRef.setInput('fieldName', this.getLabel(key));
        if(parentKey && !_.isEmpty(parentKey) ) componentRef.setInput('parentName', parentKey.toLowerCase());
        componentRef.setInput('fieldValue', '');
        return componentRef;
    }

    private buildTextField(view: ViewContainerRef, key: string, parentKey?: string) {
        let componentRef = view.createComponent(StringComponent);
        componentRef.setInput('fieldName', this.getLabel(key));
        if(parentKey && !_.isEmpty(parentKey) ) componentRef.setInput('parentName', parentKey.toLowerCase());
        componentRef.setInput('fieldValue', '');
        componentRef.setInput('placeholder', `enter a value for ${key}`);
        return componentRef;
    }

    private buildNumericField(view: ViewContainerRef, key: string, property: any, parentKey?: string) {
        let placeholder = "enter a numeric value";
        if (property.minimum != null && property.maximum != null) placeholder = "numeric value between " + property.minimum + "-" + property.maximum;
        else {
            if (property.minimum != null) placeholder = "number great than " + property.minimum;
            if (property.maximum != null) placeholder = "number less than " + property.maximum;
        }
        let componentRef = view.createComponent(NumberComponent);
        componentRef.setInput('fieldName', this.getLabel(key));
        if(parentKey && !_.isEmpty(parentKey) ) componentRef.setInput('parentName', parentKey.toLowerCase());
        componentRef.setInput('fieldValue', false);
        componentRef.setInput('placeholder', placeholder);
        return componentRef;
    }

    private buildSelectField(view: ViewContainerRef, key: string, list: string[], parentKey?: string) {
        let componentRef = view.createComponent(SelectorComponent);
        componentRef.setInput('fieldName', this.getLabel(key));
        if(parentKey && !_.isEmpty(parentKey) ) componentRef.setInput('parentName', parentKey.toLowerCase());
        componentRef.setInput('fieldValue', '');
        componentRef.setInput('valueList', list);
        componentRef.setInput('placeholder', `select a value`);
        return componentRef;
    }

    private buildCheckBoxListField(view: ViewContainerRef, key: string, list: string[], parentKey?: string) {
        let componentRef = view.createComponent(CheckboxListComponent);
        componentRef.setInput('fieldName', this.getLabel(key));
        if(parentKey && !_.isEmpty(parentKey) ) componentRef.setInput('parentName', parentKey.toLowerCase());
        componentRef.setInput('fieldValue', '');
        componentRef.setInput('valueList', list);
        componentRef.setInput('placeholder', `select a value`);
        return componentRef;
    }

    private buildTextListField(view: ViewContainerRef, key: string, parentKey?: string) {
        let componentRef = view.createComponent(TextListComponent);
        componentRef.setInput('fieldName', this.getLabel(key));
        if(parentKey && !_.isEmpty(parentKey) ) componentRef.setInput('parentName', parentKey.toLowerCase());
        componentRef.setInput('fieldValue', '');
        componentRef.setInput('placeholder', `enter values seperated with a comma`);
        return componentRef;
    }

    private getLabel(key: string) {
        return key.replace(/([A-Z])/g, (m, p) => ' ' + p).toUpperCase();
    }

    pullItem(key: string, items: any[]) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].key == key) return items[i].content;
        }
        return "";
    }

    pullAll(exclude: string[], items: any[]) {
        let html = "";
        for (let i = 0; i < items.length; i++) {
            if (!exclude.includes(items[i].key)) html += items[i].content;
        }
        return html;
    }

    render(schema: any, view: ViewContainerRef, lColorArray: string[], bColorArray: string[]) {
        this.items = [];
        this.bColorArray = bColorArray;
        this.lColorArray = lColorArray;
        if (schema.properties) {
            const nestLevel = 0;
            this.addFields(schema, view, nestLevel);

            // let hasAddress = false;
            // let hasHostName = false;
            // let hasPort = false;
            // let hasProtocol = false;
            // let hasForwardProtocol = false;
            // let hasForwardPort = false;
            // let hasForwardAddress = false;
            // for (let i = 0; i < items.length; i++) {
            //     if (items[i].key == "port") hasPort = true;
            //     else if (items[i].key == "address") hasAddress = true;
            //     else if (items[i].key == "hostname") hasHostName = true;
            //     else if (items[i].key == "protocol") hasProtocol = true;
            //     else if (items[i].key == "forwardprotocol") hasForwardProtocol = true;
            //     else if (items[i].key == "forwardport") hasForwardPort = true;
            //     else if (items[i].key == "forwardaddress") hasForwardAddress = true;
            // }
            //
            // let exclude: string[] = [];
            // if (hasHostName) {
            //     if (hasProtocol && hasPort) {
            //         exclude = ["protocol", "hostname", "port"];
            //         html += '<div class="grid addressFull">' + this.pullItem("protocol", items) + this.pullItem("hostname", items) + this.pullItem("port", items) + "</div>";
            //     } else {
            //         if (hasPort) {
            //             exclude = ["hostname", "port"];
            //             html += '<div class="grid addressPort">' + this.pullItem("hostname", items) + this.pullItem("port", items) + "</div>";
            //         } else {
            //             if (hasProtocol) {
            //                 exclude = ["hostname", "protocol"];
            //                 html += '<div class="grid addressProtocol">' + this.pullItem("protocol", items) + this.pullItem("hostname", items) + "</div>";
            //             }
            //         }
            //     }
            // } else {
            //     if (hasAddress) {
            //         if (hasProtocol && hasPort) {
            //             exclude = ["protocol", "address", "port"];
            //             html += '<div class="grid addressFull">' + this.pullItem("protocol", items) + this.pullItem("address", items) + this.pullItem("port", items) + "</div>";
            //         } else {
            //             if (hasPort) {
            //                 exclude = ["address", "port"];
            //                 html += '<div class="grid addressPort">' + this.pullItem("address", items) + this.pullItem("port", items) + "</div>";
            //             } else {
            //                 if (hasProtocol) {
            //                     exclude = ["address", "protocol"];
            //                     html += '<div class="grid addressProtocol">' + this.pullItem("protocol", items) + this.pullItem("address", items) + "</div>";
            //                 }
            //             }
            //         }
            //     }
            // }
            // if (hasForwardProtocol) {
            //     exclude = exclude.concat(["forwardprotocol", "allowedprotocols"]);
            //     html += this.pullItem("forwardprotocol", items);
            //     html += '<div class="schema_forwardProtocol_area" style="display:none">' + this.pullItem("allowedprotocols", items) + '</div ass>';
            // }
            // if (hasForwardAddress) {
            //     exclude = exclude.concat(["forwardaddress", "allowedaddresses"]);
            //     html += this.pullItem("forwardaddress", items);
            //     html += '<div class="schema_forwardAddress_area" style="display:none">' + this.pullItem("allowedaddresses", items) + '</div>';
            // }
            // if (hasForwardPort) {
            //     exclude = exclude.concat(["forwardport", "allowedportranges"]);
            //     html += this.pullItem("forwardport", items);
            //     html += '<div class="schema_forwardPort_area" style="display:none">' + this.pullItem("allowedportranges", items) + '</div></div>';
            // }
            // html += this.pullAll(exclude, items);
            //
            // $("#" + schema.formId).html(html);
            // $("input").blur((e: any) => {
            //     $(e.currentTarget).val($(e.currentTarget).val().trim());
            // });
            // if (schema.codeView != null) {
            //     setTimeout(() => {
            //         let json = schema.val();
            //         schema.codeView.setValue(JSON.stringify(json));
            //         schema.codeView.autoFormatRange({line: 0, ch: 0}, {line: schema.codeView.lineCount()});
            //     }, 500);
            // }
            // this.events();
        }
        return this.items;
    }

    private addFields(schema: any, view: ViewContainerRef, nestLevel: number) {
        for (let key in schema.properties) {
            const k = key.toLowerCase();
            if (k !== "httpchecks" && k !== "portchecks") {
                this.items.push({key: k, component: this.addField(view, key, schema.properties[key], nestLevel)});
            }
        }
    }

    updateForm(value: string) {
        // schema.val(value, true);
    }

    val(schema: any, value: any, bypass: boolean) {
        if (value != null) {
            if (schema.properties) {
                for (let key in schema.properties) {
                    let property = schema.properties[key];
                    let type = this.getType(property);
                    if (type == "object") {
                        if (value[key] == null) value[key] = {};
                        if (property.properties != null) {
                            for (let subKey in property.properties) {
                                value[key][subKey] = this.setValue(schema, subKey, type, value[key][subKey], key);
                            }
                        }
                    } else value[key] = this.setValue(schema, key, type, value[key]);
                }
                // if (!bypass) {
                //     schema.codeView.setValue(JSON.stringify(value));
                //     schema.codeView.autoFormatRange({line: 0, ch: 0}, {line: schema.codeView.lineCount()});
                //     schema.codeView.setSize(null, 260);
                // }
            }
        } else {
            let json: any = {};
            if (schema.properties) {
                for (let key in schema.properties) {
                    let property = schema.properties[key];
                    if (this.getType(property) == "object") {
                        json[key] = {};
                        if (property.properties != null) {
                            for (let subKey in property.properties) {
                                json[key] = this.getValue(schema, subKey, property.properties[subKey], json[key]);
                            }
                        }
                    } else json = this.getValue(schema, key, property, json);
                }
                if (json.dialInterceptedAddress) {
                    json.allowedAddresses = schema.getListValue('schema_dialInterceptedAddress_allowedAddresses');
                    json.forwardAddress = true;
                    delete json.address;
                    delete json.dialInterceptedAddress;
                } else {
                    delete json.dialInterceptedAddress;
                }
                if (json.dialInterceptedProtocol) {
                    json.allowedProtocols = schema.getListValue('schema_dialInterceptedProtocol_allowedProtocols');
                    json.forwardProtocol = true;
                    delete json.protocol;
                    delete json.dialInterceptedProtocol;
                } else {
                    delete json.dialInterceptedProtocol;
                }
                if (json.dialInterceptedPort) {
                    json.allowedPortRanges = schema.getListValue('schema_dialInterceptedPort_allowedPorts');
                    json.forwardPort = true;
                    delete json.port;
                    delete json.dialInterceptedPort;
                } else {
                    delete json.dialInterceptedPort;
                }
                if (json.forwardProtocol) {
                    delete json.protocol;
                } else {
                    delete json.forwardProtocol;
                    delete json.allowedProtocols;
                }
                if (json.forwardPort) {
                    delete json.port;
                } else {
                    delete json.forwardPort;
                    delete json.allowedPortRanges;
                }
                if (json.forwardAddress) {
                    delete json.address;
                } else {
                    delete json.forwardAddress;
                    delete json.allowedAddresses;
                }
                // if (json.listenOptions) delete json.listenOptions;
                if (json.httpChecks) delete json.httpChecks;
                if (json.portChecks) delete json.portChecks;
            }
            return json;
        }
    }

    setValue(schema: any, key: string, type: string, value: any, parentKey?: string) {
        if (value == null) {
            if (type == "array") {
                value = [];
            } else if (type == "integer") {
                value = 0;
            } else if (type == "boolean") {
                value = false;
            } else {
                value = "";
            }
        } else if (type == "boolean") {
            if (value) {
                $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).addClass("on");
                $("." + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_area").show();
                $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key.split("forward").join("").toLowerCase()).prop("disabled", true);
                if ($("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key.split("forward").join("").toLowerCase()).prop('nodeName') == "INPUT") $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key.split("forward").join("").toLowerCase()).val("");
            } else $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).removeClass("on");
        } else {
            if (type == "array") {
                $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_selected").html("");
                if ($("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).hasClass("checkboxList")) {
                    let total = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).data("total");
                    for (let i = 0; i < total; i++) {
                        $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_" + i).removeClass("checked");
                    }
                }
                for (let i = 0; i < value.length; i++) {
                    if (typeof value[i] == "object") {
                        let values = [];
                        for (let prop in value[i]) {
                            values.push(prop + ": " + value[i][prop]);
                        }
                        let types = [];

                        let obj = $("#" + ((parentKey != null) ? parentKey + '_' : '') + 'schema_' + key + '_Button');
                        let id = obj.data("id");
                        let vals = obj.data("values").split(',');
                        for (let j = 0; j < vals.length; j++) {
                            if ($("#" + id + "_" + vals[j]).attr('type') == "number") {
                                types.push("number");
                            } else {
                                types.push("string");
                            }
                        }

                        let element = $('<div class="tag obj" data-types="' + types.toString() + '">' + values.toString() + '</div>');
                        element.click(schema.removeMe);
                        $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_selected").append(element);
                    } else {
                        if ($("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).hasClass("checkboxList")) {
                            let total = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).data("total");
                            for (let i = 0; i < total; i++) {
                                if ($("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_" + i).data("value") == value[i]) {
                                    $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_" + i).addClass("checked");
                                }
                            }
                        } else {
                            let element = $('<div class="tag">' + value[i] + '</div>');
                            element.click(schema.removeMe);
                            $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_selected").append(element);
                        }
                    }
                }
            } else {
                $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).val(value);
            }
        }
        return value;
    }

    getValue(key: string, property: any, json: any, parentKey: string) {
        if (this.getType(property) == "array") {
            json[key] = [];
            if ($("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).hasClass("checkboxList")) {
                let obj = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key);
                let total = obj.data("total");
                for (let i = 0; i < total; i++) {
                    let item = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_" + i);
                    if (item.hasClass("checked")) json[key].push(item.data("value"));
                }
            } else {
                $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_selected").children().each(function (i, e) {
                    if ($(e).hasClass("obj")) {
                        let items = $(e).html().split(',');
                        let types = $(e).data("types").split(',');
                        let obj: any = {};
                        for (let i = 0; i < items.length; i++) {
                            let info = items[i].split(':');
                            let prop: any = info.shift();
                            let value: any = info.join(':').trim();
                            let type = types[i];
                            if (type == "number" && !isNaN(value)) {
                                obj[prop] = Number(value);
                            } else {
                                obj[prop] = value;
                            }
                        }
                        json[key].push(obj);
                    } else {
                        json[key].push($(e).html());
                    }
                });
            }
        } else if (this.getType(property) == "boolean") {
            json[key] = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).hasClass("on");
        } else if (this.getType(property) == "integer") {
            let numValue: any = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).val();
            if (numValue != null && numValue.trim().length > 0) {
                numValue = numValue.trim();
                if (numValue == "" || isNaN(numValue)) {
                    numValue = 0;
                    if (key.toLowerCase().indexOf("timeout") >= 0) numValue = 5000;
                } else {
                    numValue = Number(numValue)
                }
                json[key] = numValue;
            } else {
                delete json[key];
            }
        } else {
            json[key] = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).val();
        }
        return json;
    }

    getListValue(id: string) {
        let listItems: any[] = [];
        $("#" + id + "_selected").children().each(function (i, e) {
            if ($(e).hasClass("obj")) {
                let items = $(e).html().split(',');
                let obj: any = {};
                for (let i = 0; i < items.length; i++) {
                    let info = items[i].split(':');
                    let prop = info.shift();
                    let value: any = info.join(':').trim();
                    if (!isNaN(value)) {
                        obj[prop as string] = Number(value);
                    } else {
                        obj[prop as string] = value;
                    }
                }
                listItems.push(obj);
            } else {
                listItems.push($(e).html());
            }
        });
        return listItems;
    }

    validate(schema: any) {
        for (let key in schema.properties) {
            let property = schema.properties[key];
            this.validateProperty(schema, key, property);
        }
    }

    validateProperty(schema: any, key: string, property: any, parentKey?: string) {
        let type = this.getType(property);
        if (type == "object") {
            for (let subKey in property.properties) {
                this.validateProperty(subKey, property.properties[subKey], key);
            }
        } else {
            let elem = $("#" + ((parentKey) ? parentKey + "_" : "") + "schema_" + key);
            let theValue: any = '';
            if (elem.val() != null) theValue = elem.val();
            if (type == "integer") {
                if (schema.required && schema.required.includes(key)) {
                    let min = null;
                    let max = null;
                    if (property.minimum) min = Number(property.minimum);
                    if (property.maximum) max = Number(property.maximum);
                    if (isNaN(parseInt(theValue))) elem.addClass("errors");
                    else {
                        let val = Number(theValue);
                        if (min != null && val < min) elem.addClass("errors");
                        if (max != null && val > max) elem.addClass("errors");
                    }
                }
            } else if (type == "array") {
                if (schema.data.required && schema.data.required.includes(key)) {
                    if ($("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).hasClass("checkboxList")) {
                        let obj = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key);
                        let total = obj.data("total");
                        let hasSelection = false;
                        for (let i = 0; i < total; i++) {
                            let item = $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_" + i);
                            if (item.hasClass("checked")) {
                                hasSelection = true;
                                break;
                            }
                        }
                        if (!hasSelection) $("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key).addClass("errors");
                    } else {
                        if ($("#" + ((parentKey != null) ? parentKey + '_' : '') + "schema_" + key + "_selected").children().length == 0) elem.addClass("errors");
                    }
                }
            } else {
                if (schema.data.required && schema.data.required.includes(key) && theValue.length == 0) elem.addClass("errors");
            }
        }
    }
}
