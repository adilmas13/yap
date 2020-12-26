let s = (value: string) => value->React.string

// converts an array(`a) to List of React Element
let map = (items: array<'a>, func: 'a => 'b) => {
  items->Belt.Array.map(func)->React.array;
};

// converts an array(`a) to List of React Element
let mapi = (items: array<'a>, func: (int, 'a) => 'b) => {
  items->Belt.Array.mapWithIndex(func)->React.array;
};
