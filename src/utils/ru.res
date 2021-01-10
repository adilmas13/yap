let s = (value: string) => value->React.string

// converts an array(`a) to List of React Element
let map = (items: array<'a>, func: 'a => 'b) => {
  items->Belt.Array.map(func)->React.array
}

// converts an array(`a) to List of React Element
let mapi = (items: array<'a>, func: (int, 'a) => 'b) => {
  items->Belt.Array.mapWithIndex(func)->React.array
}

let tapNext = (observable: Rx.Observable.t<'a>, func: 'a => unit) => {
  observable->Rx.Operators.tap(~next=func, ~error=_ => (), ~complete=_ => ())
}

let onNextError = (observable: Rx.Observable.t<'a>, ~next: 'a => unit, ~error: 'b => unit) => {
  observable->Rx.Observable.subscribe(~next, ~error, ~complete=_ => ())
}
