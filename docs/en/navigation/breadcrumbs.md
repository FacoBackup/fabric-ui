## Usage

```jsx
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Fabric, Breadcrumbs, Button} from 'fabric-ui';

function App() {

  return (
    <Fabric>
      <Breadcrumbs divider={'-'} justify={'start'}>
        <Button>A1</Button>
        <Button>A2</Button>
        <Button>A3</Button>
        <Button>A4</Button>
        <Button>A5</Button>
      </Breadcrumbs>
    </Fabric>
  );
}

ReactDOM.render(<App/>, document.querySelector('#app'));
```

## Props
- ***justify***: Content justification `one of string`.
  - ***end***.
  - ***middle***.
  - ***start***.
- ***divider***: Custom divider to be rendered between the elements `string`.
- ***children***: `node`.