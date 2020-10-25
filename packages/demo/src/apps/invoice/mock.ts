export type InvoiceListProp = {
  _id: number
  number: number
  date: string
  biller: string
  recipient: string
  total_cost: string
  status: number
}

export const invoiceData: InvoiceListProp[] = [
  {
    _id: 3,
    number: 1246,
    date: "20 Oct 2020",
    biller: "Avengers Inc.",
    recipient: "America",
    total_cost: "23000",
    status: 0,
  },
  {
    _id: 4,
    number: 1247,
    date: "21 Oct 2020",
    biller: "Avengers Inc.",
    recipient: "America",
    total_cost: "23000",
    status: 3,
  },
  {
    _id: 1,
    number: 1244,
    date: "18 Oct 2020",
    biller: "Avengers Inc.",
    recipient: "Planet Earth",
    total_cost: "83000",
    status: 2,
  },
  {
    _id: 2,
    number: 1245,
    date: "19 Oct 2020",
    biller: "Avengers Inc.",
    recipient: "Azgard",
    total_cost: "3000",
    status: 1,
  },
]