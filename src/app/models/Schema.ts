export interface WidgetItem {
  type: string,
  header?: string,
  columns?: number,
  label?: string,
  value?: string,
  required?: boolean,
  symbol?: string,
  precision?: number,
  items?: Array<WidgetItem>
}

export interface Widget {
  id: number,
  name: string,
  type: string,
  items: Array<WidgetItem>
}

export interface Schema {
  widgets: Array<Widget>
}
