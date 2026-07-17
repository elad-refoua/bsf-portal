/** Props every custom tool-body receives from ToolShell's render prop. */
export interface ToolBodyProps {
  data: Record<string, unknown>;
  setField: (id: string, value: unknown) => void;
  setData: (data: Record<string, unknown>) => void;
  accentHex: string;
}
