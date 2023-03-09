import { GridLocaleText } from "@mui/x-data-grid";

export const DataGridLocale: GridLocaleText = {
  // Root
  noRowsLabel: "Nėra elementų",
  noResultsOverlayLabel: "Rezultatų nerasta.",

  // Density selector toolbar button text
  toolbarDensity: "Tankumas",
  toolbarDensityLabel: "Tankumas",
  toolbarDensityCompact: "Kompaktiškas",
  toolbarDensityStandard: "Standartinis",
  toolbarDensityComfortable: "Patogus",

  // Columns selector toolbar button text
  toolbarColumns: "Stulpeliai",
  toolbarColumnsLabel: "Pasirinkite stulpelius",

  // Filters toolbar button text
  toolbarFilters: "Filtrai",
  toolbarFiltersLabel: "Rodyti filtrus",
  toolbarFiltersTooltipHide: "Slėpti filtrus",
  toolbarFiltersTooltipShow: "Rodyti filtrus",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktyvūs filtrai` : `${count} aktyvus filtras`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: "Paieška...",
  toolbarQuickFilterLabel: "Paieška",
  toolbarQuickFilterDeleteIconLabel: "Išvalyti",

  // Export selector toolbar button text
  toolbarExport: "Eksportuoti",
  toolbarExportLabel: "Eksportuoti",
  toolbarExportCSV: "Atsisiųsti kaip CSV",
  toolbarExportPrint: "Spausdinti",
  toolbarExportExcel: "Atsisiųsti kaip Excel",

  // Columns panel text
  columnsPanelTextFieldLabel: "Surasti stulpelį",
  columnsPanelTextFieldPlaceholder: "Stulpelio pavadinimas",
  columnsPanelDragIconLabel: "Keisti stulpelio eiliškumą",
  columnsPanelShowAllButton: "Rodyti viską",
  columnsPanelHideAllButton: "Slėpti viską",

  // Filter panel text
  filterPanelAddFilter: "Pridėti filtrą",
  filterPanelDeleteIconLabel: "Trinti",
  filterPanelOperatorAnd: "Ir",
  filterPanelOperatorOr: "Arba",
  filterPanelColumns: "Stulpeliai",
  filterPanelInputLabel: "Vertė",
  filterPanelInputPlaceholder: "Filtruoti vertę",

  // Filter operators text
  filterOperatorContains: "turi",
  filterOperatorEquals: "lygus",
  filterOperatorStartsWith: "prasideda nuo..",
  filterOperatorEndsWith: "užsibaiga..",
  filterOperatorIs: "yra",
  filterOperatorNot: "nėra",
  filterOperatorAfter: "yra po",
  filterOperatorOnOrAfter: "yra ant ar po",
  filterOperatorBefore: "yra prieš",
  filterOperatorOnOrBefore: "yra ant arba prieš",
  filterOperatorIsEmpty: "yra tuščias",
  filterOperatorIsNotEmpty: "nėra tuščias",
  filterOperatorIsAnyOf: "yra bet kuris iš",

  // Filter values text
  filterValueAny: "bet kuris",
  filterValueTrue: "taip",
  filterValueFalse: "ne",

  // Column menu text
  columnMenuLabel: "Meniu",
  columnMenuShowColumns: "Rodyti stulpelius",

  columnMenuFilter: "Filtras",
  columnMenuHideColumn: "Slėpti stulpelį",
  columnMenuUnsort: "Panaikinti rikiavimą",
  columnMenuSortAsc: "Rūšiuoti pagal didėjimą",
  columnMenuSortDesc: "Rūšiuoti pagal mažėjimą",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktyvūs filtrai` : `${count} aktyvus filtras`,
  columnHeaderFiltersLabel: "Rodyti filtrus",
  columnHeaderSortIconLabel: "Rūšiuoti",

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} pasirinkti elementai`
      : `${count.toLocaleString()} pasirinktas elementas`,

  // Total row amount footer text
  footerTotalRows: "Iš viso elementų:",

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} iš ${totalCount.toLocaleString()}`,

  MuiTablePagination: {
    labelDisplayedRows: ({ from, to, count }) => `${count} iš ${to}`,
  },

  // Checkbox selection text
  checkboxSelectionHeaderName: "Žymimojo langelio pasirinkimas",
  checkboxSelectionSelectAllRows: "Pasirinkti visus elementus",
  checkboxSelectionUnselectAllRows: "Išvalyti pasirinkimą",
  checkboxSelectionSelectRow: "Pasirinkti elementą",
  checkboxSelectionUnselectRow: "Atšaukti elemento pasirinkimą",

  // Boolean cell text
  booleanCellTrueLabel: "taip",
  booleanCellFalseLabel: "ne",

  // Actions cell more text
  actionsCellMore: "daugiau",

  // Column pinning text
  pinToLeft: "Prikabinti kairėje",
  pinToRight: "Prikabinti dešinėje",
  unpin: "Atkabinti",

  // Tree Data
  treeDataGroupingHeaderName: "Grupė",
  treeDataExpand: "Peržiūrėti vaiką",
  treeDataCollapse: "Paslėpti vaiką",

  // Grouping columns
  groupingColumnHeaderName: "Grupė",
  groupColumn: (name) => `Grupuoti pagal ${name}`,
  unGroupColumn: (name) => `Atšaukti grupavimą pagal ${name}`,

  // Master/detail
  detailPanelToggle: "Išsamios informacijos skydelio perjungimas",
  expandDetailPanel: "Išskleisti",
  collapseDetailPanel: "Suskleisti",

  // Row reordering text
  rowReorderingHeaderName: "Elementų eiliškumo keitimas",

  // Aggregation
  aggregationMenuItemHeader: "Agregavimas",
  aggregationFunctionLabelSum: "suma",
  aggregationFunctionLabelAvg: "vidurkis",
  aggregationFunctionLabelMin: "min",
  aggregationFunctionLabelMax: "max",
  aggregationFunctionLabelSize: "dydis",
  errorOverlayDefaultLabel: "Įvyko klaida",
  filterPanelLinkOperator: "Sujungimo operatorius",
  filterPanelOperators: "Operatoriai",
};
