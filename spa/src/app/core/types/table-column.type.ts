export type TableColumnType = 'text' | 'date' | 'boolean' | 'number' | 'uuid';

export type TableColumn = {
    key: string;
    type: TableColumnType;
    translate: string;
    sort?: boolean;
};
