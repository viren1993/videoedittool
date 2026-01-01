# @designcombo/animations

A powerful animation library for managing complex animation sequences and transitions in React applications, with specialized components for different animation scenarios.

## Installation

```bash
npm install @designcombo/animations
# or
yarn add @designcombo/animations
# or
pnpm add @designcombo/animations
```

## Usage

### BoxAnim Component

The main animation wrapper for standard in/out animations with rotation handling:

```tsx
import { BoxAnim } from "@designcombo/animations";

<BoxAnim
  animationIn={[
    {
      property: "opacity",
      from: 0,
      to: 1,
      durationInFrames: 30,
      ease: (t) => t,
      delay: 0
    },
    {
      property: "translateX",
      from: -100,
      to: 0,
      durationInFrames: 30,
      ease: (t) => t
    }
  ]}
  animationOut={[
    {
      property: "opacity",
      from: 1,
      to: 0,
      durationInFrames: 15,
      ease: (t) => t
    }
  ]}
  durationInFrames={60}
  frame={currentFrame}
  style={{ transform: "rotate(45deg)" }}
>
  <div>Your BoxAnim content here</div>
</BoxAnim>;
```

### ContentAnim Component

For timed animations that are affected by rotation transformations:

```tsx
import { ContentAnim } from "@designcombo/animations";

<ContentAnim
  animationTimed={[
    {
      property: "scale",
      from: 0.8,
      to: 1.2,
      durationInFrames: 45,
      ease: (t) => t,
      persist: true
    }
  ]}
  durationInFrames={60}
  frame={currentFrame}
  style={{ width: 200, height: 200 }}
>
  <div>Content with timed animations</div>
</ContentAnim>;
```

### MaskAnim Component

For creating mask reveal animations with different patterns:

```tsx
import { MaskAnim } from "@designcombo/animations";

<MaskAnim
  frame={currentFrame}
  item={itemData}
  keyframeAnimations={[
    {
      property: "maskRevealIn", // or "maskRevealCenterIn", "maskRevealCornerIn"
      durationInFrames: 30
    }
  ]}
>
  <div>Content that will be revealed with mask animation</div>
</MaskAnim>;
```

### Animation Hook

Direct access to animation calculations:

```tsx
import {
  useAnimation,
  combineAnimations,
  combine
} from "@designcombo/animations";

// Basic usage
const style = useAnimation(
  combineAnimations(animations),
  durationInFrames,
  frame,
  false // isOut
);

// Advanced usage with timed animations
const timedStyle = useAnimation(
  combineAnimations(animations),
  durationInFrames,
  frame,
  false, // isOut
  true // isTimed
);

// Combining multiple animation sources
const combinedAnimations = combine(
  animationIn,
  animationOut,
  additionalAnimations
);
```

## Animation Properties

The library supports various animation properties:

- **Transform Properties**: `scale`, `translateX`, `translateY`, `rotate`
- **Visual Properties**: `opacity`
- **Special Properties**: `shake` (with automatic intervals)
- **Mask Properties**: `maskRevealIn`, `maskRevealCenterIn`, `maskRevealCornerIn`

## Animation Interface

```tsx
interface Animation {
  property: keyof React.CSSProperties | string;
  from: number;
  to: number;
  durationInFrames: number;
  ease: (t: number) => number;
  delay?: number;
  persist?: boolean; // For timed animations
}
```

## Features

- **Animated Component**: Main wrapper for in/out animations with rotation compensation
- **ContentAnimations Component**: Specialized for timed animations affected by rotation
- **MaskWrapper Component**: Creates mask reveal effects with multiple patterns
- **Animation Hook**: Direct access to animation calculations
- **Rotation Handling**: Automatic compensation for rotated elements
- **Persistent Animations**: Support for animations that persist after completion
- **Shake Effects**: Built-in shake animation with automatic intervals
- **Transform Extraction**: Utilities for parsing and combining transform properties
- **Performance Optimized**: Efficient animation rendering with memoization
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Remotion Integration**: Built for Remotion video framework

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build package
pnpm build

# Format code
pnpm format
```

## License

MIT
