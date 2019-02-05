# Debug Grid Overlay
🏁 Display your design's grid as an overlay on top of your web site or app to debug positioning of elements.


## Usage
Import it as a ES6 module and initialize it:
```
import DebugGridOverlay from 'DebugGridOverlay';

DebugGridOverlay({
    columns: 24,
    columnWidth: '1fr',
    gutterWidth: '16px',
});
```

You can now trigger the overlay by pressing on lowercase "g" on your keyboard. You can also toggle the overlay manually by calling the `.toggle()` method.

**Note**: You should disable this in your production build by wrapping the initialization in a conditional, like so:
```
if (process.env.NODE_ENV === 'development') {
    DebugGridOverlay();
}
```

## Options
```
const debugGrid = DebugGridOverlay({
    columns: 12,
    // The amount of columns in your grid
    // Default: 12

    columnWidth: '1fr',
    // Default: 1fr

	gutterWidth: '16px',
    // Default: 16px

	maxWidth: '1344px',
    // Sets a max width for your grid
    // Default: null,

	marginsWidth: '40px',
    // Sets outer document margins for your grid
    // Default: null

	verticalRhythm: '20px',
    // Useful for seeing if your design confirms to the vertical rhythm
    // Default: 20px

	keyCode: 71,
    // Keyboard key code that triggers the overlay
    // Default: 71 (lowercase 'g')
});
```
