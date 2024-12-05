# LineSense Extension for VS Code

## Overview
**LineSense** is a VS Code extension designed to gamify your coding experience by tracking your coding progress and scoring your input. It detects rapid inputs and potential copy-pasting, helping you maintain awareness of your coding habits while providing feedback to keep you motivated.

---

## Features
- **Coding Progress Tracker**:
  - Tracks the number of characters written in the active editor.
  - Displays a score in the status bar that updates as you code.

- **Copy-Paste Detection**:
  - Detects and warns about large chunks of text pasted into the editor.
  - Alerts you when rapid input (e.g., potential copied code) is detected.

- **Status Bar Integration**:
  - Displays a status bar item with your current score and a tooltip for additional context.
  - Uses a visually appealing golden color to highlight activity.

- **Real-Time Feedback**:
  - Provides pop-up messages for coding achievements and warnings for unusual input patterns.

---

## How It Works
1. **Activation**:
   When the extension is activated, it initializes a score tracker and displays a status bar item.

2. **Command Registration**:
   A custom command (`linesense.checkCode`) allows users to manually check their coding progress. This command:
   - Calculates the number of characters written since the last check.
   - Updates the score based on the characters written.
   - Warns about rapid input or potential copy-pasting.

3. **Real-Time Monitoring**:
   The extension listens for changes in the active document and:
   - Calculates the time elapsed since the last check.
   - Evaluates whether the changes suggest rapid input or copy-pasting.
   - Updates the score and displays relevant feedback messages.

4. **Deactivation**:
   The extension cleans up resources and logs its deactivation.

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
