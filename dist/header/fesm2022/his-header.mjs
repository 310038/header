import * as i6 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import * as i7 from 'primeng/toolbar';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import * as i5 from 'primeng/inputtext';
import { InputTextModule } from 'primeng/inputtext';
import * as i4 from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import * as i2 from 'primeng/dialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import * as i8 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as jsyaml from 'js-yaml';
import { TimesIcon } from 'primeng/icons/times';
import * as i1 from 'primeng/api';
import * as i3 from '@angular/common';

class HeaderComponent {
    constructor() {
        this.isSearchDisabled = false;
        this.search = new EventEmitter();
        this.RowChange = new EventEmitter();
        this.searchText = '';
        this.isShowDetail = false;
        this.isShowList = false;
        this.#currentIndex = -1;
    }
    #value;
    set value(value) {
        this.#value = value;
        this.currentRowChange(0);
    }
    get value() {
        return this.#value;
    }
    #initValue;
    #currentIndex;
    #currentRow;
    /**
     * 初始化
     */
    ngOnInit() {
        this.#initValue = this.value;
    }
    /**
     * currentRowChange
     * @param rowIndex
     */
    currentRowChange(rowIndex) {
        if (rowIndex >= 0) {
            this.#currentRow = this.value[rowIndex];
            if (this.isUseDefaultTemplate()) {
                this.yamlDocument = jsyaml.dump(this.#currentRow);
            }
            this.#currentIndex = rowIndex;
            this.RowChange.emit(this.#currentRow);
        }
    }
    /**
     * 上一筆資料
     */
    onPrevClick() {
        const rowIndex = (this.#currentIndex - 1 + this.value.length) % this.value.length;
        this.currentRowChange(rowIndex);
    }
    /**
     * 下一筆資料
     */
    onNextClick() {
        const rowIndex = (this.#currentIndex + 1) % this.value.length;
        this.currentRowChange(rowIndex);
    }
    /**
     * 點選一筆資料
     * @param rowIndex
     */
    onRowSelect(rowIndex) {
        this.currentRowChange(rowIndex);
    }
    /**
     * 搜尋資料
     * @param searchText
     */
    onSearch(searchText) {
        this.search.emit(searchText);
    }
    /**
     * 清除搜尋
    */
    onSearchClear() {
        this.searchText = '';
        this.value = this.#initValue;
        this.currentRowChange(this.#currentIndex);
    }
    /**
     * 是否使用預設的 template
     */
    isUseDefaultTemplate() {
        return this.detailTemplate == undefined || this.titleTemplate == undefined;
    }
    /**
     * 取得物件的 key
     */
    getKey(value, index) {
        return value ? Object.keys(value)[index] || '' : '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: HeaderComponent, isStandalone: true, selector: "his-header", inputs: { value: "value", titleTemplate: "titleTemplate", detailTemplate: "detailTemplate", listTemplate: "listTemplate", isSearchDisabled: "isSearchDisabled" }, outputs: { search: "search", RowChange: "RowChange" }, ngImport: i0, template: "<p-toolbar class=\"flex\" id=\"mydiv\">\n  <div class=\"p-toolbar-group-start\">\n    <div class=\"data\">\n      <div class=\"flex flex-wrap gap-2\">\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          icon=\"pi pi-user\"\n          (click)=\"isShowDetail = !isShowDetail\"\n          styleClass=\"p-button-secondary mr-2\"\n          class=\"p-button-rounded p-button-text p-button-plain\"\n        > </button>\n      </div>\n\n      <p-dialog\n        header=\"\u8A73\u7D30\u8CC7\u6599\"\n        [(visible)]=\"isShowDetail\"\n        [style]=\"{ width: '20vw' }\"\n        [position]=\"'left'\"\n        [draggable]=\"false\"\n        class=\"border-round w-12rem h-6rem bg-primary font-bold flex align-items-center justify-content-center\"\n      >\n        <ng-container\n          [ngTemplateOutlet]=\"detailTemplate || defaultDetailTemplate\"\n        >\n        </ng-container>\n      </p-dialog>\n    </div>\n  </div>\n\n  <div class=\"p-toolbar-group-center\">\n    <ng-container\n      [ngTemplateOutlet]=\"titleTemplate || defaultTitleTemplate\"\n    ></ng-container>\n\n    <div class=\"py-2\">\n      <button\n        pButton\n        pRipple\n        type=\"button\"\n        icon=\"pi pi-angle-left\"\n        (click)=\"onPrevClick()\"\n        styleClass=\"p-button-secondary mr-2\"\n        class=\"p-button-rounded p-button-text p-button-plain\"\n      > </button>\n\n      <button\n        pButton\n        pRipple\n        type=\"button\"\n        icon=\"pi pi-angle-right\"\n        (click)=\"onNextClick()\"\n        styleClass=\"p-button-secondary mr-2\"\n        class=\"p-button-rounded p-button-text p-button-plain\"\n      > </button>\n    </div>\n  </div>\n\n  <div class=\"p-toolbar-group-start\">\n    <section>\n      <span class=\"p-input-icon-left p-input-icon-right\">\n        <i class=\"pi pi-search\"></i>\n        <input\n          [disabled]=\"isSearchDisabled\"\n          type=\"text\"\n          pInputText\n          placeholder=\"\u8ACB\u8F38\u5165\u8EAB\u5206\u8B49\u5B57\u865F\u6216\u75C5\u6B77\u865F\u78BC\"\n          #search\n          [(ngModel)]=\"searchText\"\n          (keyup.enter)=\"onSearch(search.value)\"\n        />\n        <i class=\"pi pi-times\" (click)=\"onSearchClear()\"></i>\n      </span>\n    </section>\n\n    <button\n      pButton\n      pRipple\n      type=\"button\"\n      icon=\"pi pi-list\"\n      (click)=\"isShowList = !isShowList\"\n      styleClass=\"p-button-secondary mr-2\"\n      class=\"p-button-rounded p-button-text p-button-plain\"\n    > </button>\n\n    <p-dialog\n      header=\"\u67E5\u8A62\u6E05\u55AE\"\n      [(visible)]=\"isShowList\"\n      [style]=\"{ width: '20vw' }\"\n      [position]=\"'right'\"\n      [draggable]=\"false\"\n      class=\"border-round w-12rem h-6rem bg-primary font-bold flex align-items-center justify-content-center\"\n    >\n      <p-table [value]=\"value\" [tableStyle]=\"{ 'min-width': '10rem' }\">\n        <ng-template pTemplate=\"body\" let-row let-rowIndex=\"rowIndex\">\n          <tr (click)=\"onRowSelect(rowIndex)\" [pSelectableRow]=\"row\">\n            <ng-container\n              [ngTemplateOutlet]=\"listTemplate || defaultListTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: row }\"\n            ></ng-container>\n          </tr>\n        </ng-template>\n      </p-table>\n    </p-dialog>\n\n    <ng-template #defaultTitleTemplate>\n      <div class=\"shortResult\">\n        {{ yamlDocument }}\n      </div>\n    </ng-template>\n\n    <ng-template #defaultDetailTemplate>\n      <pre>{{ yamlDocument }}</pre>\n    </ng-template>\n\n    <ng-template #defaultListTemplate let-row>\n      <td>{{ row[getKey(value[0], 0)] }}</td>\n      <td>{{ row[getKey(value[0], 1)] }}</td>\n    </ng-template>\n  </div>\n</p-toolbar>\n", styles: [":host ::ng-deep .p-toolbar{display:flex;padding:9px 1rem;gap:0}:host ::ng-deep .p-toolbar-group-center{flex:1;justify-content:space-between;padding-right:10px}:host ::ng-deep .p-toolbar-group-center .py-2{gap:5px;display:flex}:host ::ng-deep .p-input-icon-right{align-items:center;justify-content:center}:host ::ng-deep .p-toolbar-group-start{gap:10px}:host ::ng-deep .p-button.p-button-icon-only.p-button-rounded{width:2rem;height:2rem}:host ::ng-deep .p-dialog{position:absolute;top:60px;margin-top:-28rem}:host ::ng-deep .shortResult{color:var(--surface-on-surface, #1c1d1c);font-family:Noto Sans TC;font-size:20px;font-style:normal;font-weight:700;line-height:28px;letter-spacing:.4px}:host ::ng-deep .pi-user{color:var(--surface-on-surface, #1c1d1c)}:host ::ng-deep .pi-angle-right:before{color:var(--surface-on-surface, #001b14)}:host ::ng-deep .pi-angle-left:before{color:var(--surface-on-surface, #001b14)}:host ::ng-deep .pi-search:before{color:var(--surface-on-surface, #1c1d1c)}:host ::ng-deep i.pi.pi-times{margin-left:18rem;cursor:pointer}:host ::ng-deep i.pi.pi-times input::-ms-clear{display:none}:host ::ng-deep .p-inputtext{color:var(--black-o-38, rgba(19, 20, 20, .38));font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;display:flex;padding-top:9px;padding-bottom:9px;width:320px;flex-direction:column;align-items:flex-start}:host ::ng-deep .p-inputtext.p-component{color:var(--surface-on-surface, #1c1d1c)}:host ::ng-deep .pi-list{color:var(--surface-on-surface, #1c1d1c);padding:var(--spacing-xs, 4px);gap:var(--spacing-xs, 4px);display:flex;width:24px;height:24px;padding:6.505px 4.25px 6.5px 4px;justify-content:center;align-items:center}:host ::ng-deep .p-dialog .p-dialog-header{padding:1rem}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:.5rem 1rem}\n"], dependencies: [{ kind: "ngmodule", type: InputMaskModule }, { kind: "directive", type: i1.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: DividerModule }, { kind: "ngmodule", type: DialogModule }, { kind: "component", type: i2.Dialog, selector: "p-dialog", inputs: ["header", "draggable", "resizable", "positionLeft", "positionTop", "contentStyle", "contentStyleClass", "modal", "closeOnEscape", "dismissableMask", "rtl", "closable", "responsive", "appendTo", "breakpoints", "styleClass", "maskStyleClass", "showHeader", "breakpoint", "blockScroll", "autoZIndex", "baseZIndex", "minX", "minY", "focusOnShow", "maximizable", "keepInViewport", "focusTrap", "transitionOptions", "closeIcon", "closeAriaLabel", "closeTabindex", "minimizeIcon", "maximizeIcon", "visible", "style", "position"], outputs: ["onShow", "onHide", "visibleChange", "onResizeInit", "onResizeEnd", "onDragEnd", "onMaximize"] }, { kind: "ngmodule", type: GalleriaModule }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: ToastModule }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: i4.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "style", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "scrollDirection", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "responsive", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "autoLayout", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "groupRowsByOrder", "responsiveLayout", "breakpoint", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll", "virtualRowHeight"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i4.SelectableRow, selector: "[pSelectableRow]", inputs: ["pSelectableRow", "pSelectableRowIndex", "pSelectableRowDisabled"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i5.InputText, selector: "[pInputText]" }, { kind: "ngmodule", type: DropdownModule }, { kind: "ngmodule", type: ButtonModule }, { kind: "directive", type: i6.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "ngmodule", type: ToolbarModule }, { kind: "component", type: i7.Toolbar, selector: "p-toolbar", inputs: ["style", "styleClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-header', standalone: true, imports: [
                        InputMaskModule,
                        DividerModule,
                        DialogModule,
                        GalleriaModule,
                        ToastModule,
                        TableModule,
                        InputTextModule,
                        DropdownModule,
                        ButtonModule,
                        ToolbarModule,
                        FormsModule,
                        TimesIcon,
                    ], template: "<p-toolbar class=\"flex\" id=\"mydiv\">\n  <div class=\"p-toolbar-group-start\">\n    <div class=\"data\">\n      <div class=\"flex flex-wrap gap-2\">\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          icon=\"pi pi-user\"\n          (click)=\"isShowDetail = !isShowDetail\"\n          styleClass=\"p-button-secondary mr-2\"\n          class=\"p-button-rounded p-button-text p-button-plain\"\n        > </button>\n      </div>\n\n      <p-dialog\n        header=\"\u8A73\u7D30\u8CC7\u6599\"\n        [(visible)]=\"isShowDetail\"\n        [style]=\"{ width: '20vw' }\"\n        [position]=\"'left'\"\n        [draggable]=\"false\"\n        class=\"border-round w-12rem h-6rem bg-primary font-bold flex align-items-center justify-content-center\"\n      >\n        <ng-container\n          [ngTemplateOutlet]=\"detailTemplate || defaultDetailTemplate\"\n        >\n        </ng-container>\n      </p-dialog>\n    </div>\n  </div>\n\n  <div class=\"p-toolbar-group-center\">\n    <ng-container\n      [ngTemplateOutlet]=\"titleTemplate || defaultTitleTemplate\"\n    ></ng-container>\n\n    <div class=\"py-2\">\n      <button\n        pButton\n        pRipple\n        type=\"button\"\n        icon=\"pi pi-angle-left\"\n        (click)=\"onPrevClick()\"\n        styleClass=\"p-button-secondary mr-2\"\n        class=\"p-button-rounded p-button-text p-button-plain\"\n      > </button>\n\n      <button\n        pButton\n        pRipple\n        type=\"button\"\n        icon=\"pi pi-angle-right\"\n        (click)=\"onNextClick()\"\n        styleClass=\"p-button-secondary mr-2\"\n        class=\"p-button-rounded p-button-text p-button-plain\"\n      > </button>\n    </div>\n  </div>\n\n  <div class=\"p-toolbar-group-start\">\n    <section>\n      <span class=\"p-input-icon-left p-input-icon-right\">\n        <i class=\"pi pi-search\"></i>\n        <input\n          [disabled]=\"isSearchDisabled\"\n          type=\"text\"\n          pInputText\n          placeholder=\"\u8ACB\u8F38\u5165\u8EAB\u5206\u8B49\u5B57\u865F\u6216\u75C5\u6B77\u865F\u78BC\"\n          #search\n          [(ngModel)]=\"searchText\"\n          (keyup.enter)=\"onSearch(search.value)\"\n        />\n        <i class=\"pi pi-times\" (click)=\"onSearchClear()\"></i>\n      </span>\n    </section>\n\n    <button\n      pButton\n      pRipple\n      type=\"button\"\n      icon=\"pi pi-list\"\n      (click)=\"isShowList = !isShowList\"\n      styleClass=\"p-button-secondary mr-2\"\n      class=\"p-button-rounded p-button-text p-button-plain\"\n    > </button>\n\n    <p-dialog\n      header=\"\u67E5\u8A62\u6E05\u55AE\"\n      [(visible)]=\"isShowList\"\n      [style]=\"{ width: '20vw' }\"\n      [position]=\"'right'\"\n      [draggable]=\"false\"\n      class=\"border-round w-12rem h-6rem bg-primary font-bold flex align-items-center justify-content-center\"\n    >\n      <p-table [value]=\"value\" [tableStyle]=\"{ 'min-width': '10rem' }\">\n        <ng-template pTemplate=\"body\" let-row let-rowIndex=\"rowIndex\">\n          <tr (click)=\"onRowSelect(rowIndex)\" [pSelectableRow]=\"row\">\n            <ng-container\n              [ngTemplateOutlet]=\"listTemplate || defaultListTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: row }\"\n            ></ng-container>\n          </tr>\n        </ng-template>\n      </p-table>\n    </p-dialog>\n\n    <ng-template #defaultTitleTemplate>\n      <div class=\"shortResult\">\n        {{ yamlDocument }}\n      </div>\n    </ng-template>\n\n    <ng-template #defaultDetailTemplate>\n      <pre>{{ yamlDocument }}</pre>\n    </ng-template>\n\n    <ng-template #defaultListTemplate let-row>\n      <td>{{ row[getKey(value[0], 0)] }}</td>\n      <td>{{ row[getKey(value[0], 1)] }}</td>\n    </ng-template>\n  </div>\n</p-toolbar>\n", styles: [":host ::ng-deep .p-toolbar{display:flex;padding:9px 1rem;gap:0}:host ::ng-deep .p-toolbar-group-center{flex:1;justify-content:space-between;padding-right:10px}:host ::ng-deep .p-toolbar-group-center .py-2{gap:5px;display:flex}:host ::ng-deep .p-input-icon-right{align-items:center;justify-content:center}:host ::ng-deep .p-toolbar-group-start{gap:10px}:host ::ng-deep .p-button.p-button-icon-only.p-button-rounded{width:2rem;height:2rem}:host ::ng-deep .p-dialog{position:absolute;top:60px;margin-top:-28rem}:host ::ng-deep .shortResult{color:var(--surface-on-surface, #1c1d1c);font-family:Noto Sans TC;font-size:20px;font-style:normal;font-weight:700;line-height:28px;letter-spacing:.4px}:host ::ng-deep .pi-user{color:var(--surface-on-surface, #1c1d1c)}:host ::ng-deep .pi-angle-right:before{color:var(--surface-on-surface, #001b14)}:host ::ng-deep .pi-angle-left:before{color:var(--surface-on-surface, #001b14)}:host ::ng-deep .pi-search:before{color:var(--surface-on-surface, #1c1d1c)}:host ::ng-deep i.pi.pi-times{margin-left:18rem;cursor:pointer}:host ::ng-deep i.pi.pi-times input::-ms-clear{display:none}:host ::ng-deep .p-inputtext{color:var(--black-o-38, rgba(19, 20, 20, .38));font-family:Noto Sans TC;font-size:16px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;display:flex;padding-top:9px;padding-bottom:9px;width:320px;flex-direction:column;align-items:flex-start}:host ::ng-deep .p-inputtext.p-component{color:var(--surface-on-surface, #1c1d1c)}:host ::ng-deep .pi-list{color:var(--surface-on-surface, #1c1d1c);padding:var(--spacing-xs, 4px);gap:var(--spacing-xs, 4px);display:flex;width:24px;height:24px;padding:6.505px 4.25px 6.5px 4px;justify-content:center;align-items:center}:host ::ng-deep .p-dialog .p-dialog-header{padding:1rem}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:.5rem 1rem}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], titleTemplate: [{
                type: Input
            }], detailTemplate: [{
                type: Input
            }], listTemplate: [{
                type: Input
            }], isSearchDisabled: [{
                type: Input
            }], search: [{
                type: Output
            }], RowChange: [{
                type: Output
            }] } });

/*
 * Public API Surface of header
 */

/**
 * Generated bundle index. Do not edit.
 */

export { HeaderComponent };
//# sourceMappingURL=his-header.mjs.map
