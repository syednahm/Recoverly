# Recovery Confidence Score

The Recovery Confidence Score is an AI-powered metric (0-100) that provides real-time assessment of a patient's recovery progress. It dynamically updates based on multiple recovery factors and provides actionable recommendations.

---

## Overview

The confidence score is calculated using a weighted algorithm that considers:

- **Symptom Severity** (35% weight)
- **Medication Adherence** (25% weight)
- **Task Completion** (20% weight)
- **Warning Signs** (20% weight)

### Score Ranges

| Score | Status | Color | Description |
|-------|--------|-------|-------------|
| 85-100 | Excellent | Green | Recovery ahead of schedule |
| 70-84 | Good | Amber | On track with normal progress |
| 50-69 | Fair | Amber | Some areas need attention |
| 0-49 | Needs Attention | Red | Multiple factors require focus |

---

## How It Works

### 1. Symptom Severity Score

Evaluates the severity of reported symptoms:

- **None**: No penalty
- **Mild**: 10-point penalty per symptom
- **Moderate**: 25-point penalty per symptom
- **Severe**: 50-point penalty per symptom

Higher scores indicate fewer/milder symptoms.

### 2. Medication Adherence Score

Measures percentage of medications taken as scheduled:

```
adherence = (medications_taken / total_medications) * 100
```

Only considers active medications (not yet expired).

### 3. Task Completion Score

Evaluates completion of recovery tasks with priority weighting:

- High-priority tasks: 60% weight
- All tasks: 40% weight

```
score = (high_priority_completed * 0.6) + (all_completed * 0.4)
```

### 4. Warning Signs Score

Applies penalties for active warnings:

- Critical warning: -15 points per warning
- Standard warning: -5 points per warning
- Severe symptoms: -20 points per symptom

---

## Visual Components

### ConfidenceScoreCard

Full-featured card with animated progress ring and factor breakdown.

```tsx
import { ConfidenceScoreCard } from "@/components/dashboard/ConfidenceScoreCard";
import { getConfidenceBreakdown } from "@/lib/confidence-score";

const breakdown = getConfidenceBreakdown(recoveryPlan);

<ConfidenceScoreCard breakdown={breakdown} />
```

**Features:**
- Animated SVG progress ring
- Color-coded status (green/amber/red)
- Trending indicator (up/down/stable)
- Factor breakdown with mini progress bars
- AI-powered recommendations
- Framer Motion animations

### ConfidenceBadge

Compact badge for headers or status indicators.

```tsx
import { ConfidenceBadge } from "@/components/dashboard/ConfidenceBadge";

// Default variant
<ConfidenceBadge breakdown={breakdown} />

// Compact variant
<ConfidenceBadge breakdown={breakdown} variant="compact" />
```

---

## Usage Examples

### Basic Calculation

```tsx
import { calculateConfidenceScore } from "@/lib/confidence-score";

const factors = calculateConfidenceScore(recoveryPlan);
console.log(factors.overall); // 87
console.log(factors.symptomScore); // 90
console.log(factors.medicationScore); // 75
```

### Full Breakdown with Recommendations

```tsx
import { getConfidenceBreakdown } from "@/lib/confidence-score";

const breakdown = getConfidenceBreakdown(recoveryPlan);

console.log(breakdown.overall); // 87
console.log(breakdown.label); // "Excellent"
console.log(breakdown.description); // "Recovery is progressing ahead of schedule"
console.log(breakdown.trending); // "up"
console.log(breakdown.recommendations); 
// ["Keep up the excellent work!"]
```

### Simulating Score Changes

```tsx
import {
  simulateTaskCompletion,
  simulateMedicationTaken,
} from "@/lib/confidence-examples";

// See score change when task completed
let updatedPlan = simulateTaskCompletion(plan, "task-1");
const newScore = getConfidenceBreakdown(updatedPlan).overall;

// See score change when medication taken
updatedPlan = simulateMedicationTaken(updatedPlan, "med-2");
```

### Testing Scenarios

```tsx
import {
  getExcellentScenario,
  getNeedsAttentionScenario,
  getAtRiskScenario,
  testConfidenceScenarios,
} from "@/lib/confidence-examples";

// Test all scenarios
testConfidenceScenarios(basePlan);

// Use specific scenario
const excellentPlan = getExcellentScenario(basePlan);
const breakdown = getConfidenceBreakdown(excellentPlan);
```

---

## Real-Time Updates

The confidence score automatically recalculates when:

1. **Patient completes a task**
   - Task completion score increases
   - Overall score increases proportionally

2. **Patient takes medication**
   - Medication adherence score increases
   - Overall score increases proportionally

3. **Patient reports symptoms**
   - Symptom severity score updates
   - May trigger warning score changes

4. **Warning signs are detected**
   - Warning score decreases
   - Overall score decreases proportionally

---

## Customization

### Adjusting Weights

Edit weights in `lib/confidence-score.ts`:

```typescript
const weights = {
  symptoms: 0.35,     // 35%
  medications: 0.25,  // 25%
  tasks: 0.20,        // 20%
  warnings: 0.20,     // 20%
};
```

### Adjusting Penalties

Modify penalty values for symptoms or warnings:

```typescript
const severityWeights = {
  none: 0,
  mild: 10,      // Adjust these values
  moderate: 25,
  severe: 50,
};
```

### Adjusting Score Ranges

Update thresholds for status labels:

```typescript
if (factors.overall >= 85) {
  label = "Excellent";
} else if (factors.overall >= 70) {
  label = "Good";
} 
// ... etc
```

---

## Integration with AI

The confidence score can be enhanced with AI insights:

```typescript
// Get AI recommendations based on score
const aiInsight = await generateAIRecommendation({
  score: breakdown.overall,
  factors: breakdown,
  symptoms: plan.symptoms,
  tasks: plan.tasks,
});
```

---

## Animation Details

The component uses Framer Motion for smooth animations:

- **Progress ring**: 1.8s ease-out animation with 0.2s delay
- **Score number**: Spring animation with scale effect
- **Factor bars**: Staggered animations (0.1s between each)
- **Recommendations**: Fade and slide-in effect

All animations respect `prefers-reduced-motion` accessibility settings.

---

## Performance

The confidence score calculation is:
- **Fast**: O(n) complexity where n = number of tasks/meds/symptoms
- **Lightweight**: No API calls required
- **Client-side**: Instant updates without server roundtrip

Typical calculation time: < 1ms for standard recovery plan.

---

## Testing

Run the scenario tests:

```typescript
import { simulateDailyProgress } from "@/lib/confidence-examples";

// Shows how score changes throughout the day
simulateDailyProgress(recoveryPlan);
```

Console output will show step-by-step score changes.

---

## Future Enhancements

Potential improvements to the scoring algorithm:

1. **Historical trending**: Factor in score changes over time
2. **Predictive analytics**: Use ML to predict recovery trajectory
3. **Personalization**: Adjust weights based on patient condition
4. **Benchmark comparison**: Compare to similar recovery cases
5. **Time-based penalties**: Increase weight for overdue tasks

---

## Architecture

```
lib/confidence-score.ts              # Core calculation logic
components/dashboard/
  ConfidenceScoreCard.tsx           # Full featured card
  ConfidenceBadge.tsx               # Compact badge
lib/confidence-examples.ts          # Testing utilities
```

---

## Related Documentation

- [Symptom Check-In System](./SYMPTOM_CHECKIN.md)
- [Recovery Plan Structure](./RECOVERY_PLAN.md)
- [Medication Management](./MEDICATIONS.md)
