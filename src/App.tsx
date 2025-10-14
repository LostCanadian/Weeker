import { FormEvent, useMemo, useState } from 'react';
import './App.css';

type FocusItem = {
  id: string;
  title: string;
  targetHours: number;
  spentHours: number;
};

const initialFocus: FocusItem[] = [
  {
    id: 'deep-work',
    title: 'Deep Work Blocks',
    targetHours: 10,
    spentHours: 3.5,
  },
  {
    id: 'collaboration',
    title: 'Collaboration & 1:1s',
    targetHours: 6,
    spentHours: 4,
  },
  {
    id: 'learning',
    title: 'Learning & Growth',
    targetHours: 4,
    spentHours: 1.5,
  },
];

function App() {
  const [focusItems, setFocusItems] = useState<FocusItem[]>(initialFocus);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('4');

  const summary = useMemo(() => {
    const totals = focusItems.reduce(
      (acc, item) => {
        acc.target += item.targetHours;
        acc.spent += item.spentHours;
        return acc;
      },
      { target: 0, spent: 0 },
    );

    const achievedCount = focusItems.filter(
      (item) => item.spentHours >= item.targetHours && item.targetHours > 0,
    ).length;

    return {
      ...totals,
      achievedCount,
    };
  }, [focusItems]);

  const handleAddFocus = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = newTitle.trim();
    const parsedTarget = Number(newTarget);

    if (!trimmedTitle || Number.isNaN(parsedTarget) || parsedTarget <= 0) {
      return;
    }

    const newItem: FocusItem = {
      id: `focus-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      title: trimmedTitle,
      targetHours: Math.min(parsedTarget, 80),
      spentHours: 0,
    };

    setFocusItems((items) => [newItem, ...items]);
    setNewTitle('');
    setNewTarget(parsedTarget.toString());
  };

  const updateSpentHours = (id: string, newSpent: number) => {
    setFocusItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              spentHours: Math.max(0, Math.min(newSpent, 120)),
            }
          : item,
      ),
    );
  };

  const adjustSpent = (id: string, delta: number) => {
    const current = focusItems.find((item) => item.id === id);
    if (!current) return;

    updateSpentHours(id, current.spentHours + delta);
  };

  const removeFocusItem = (id: string) => {
    setFocusItems((items) => items.filter((item) => item.id !== id));
  };

  const resetWeek = () => {
    setFocusItems((items) =>
      items.map((item) => ({
        ...item,
        spentHours: 0,
      })),
    );
  };

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <h1>Weeker</h1>
          <p className="app__tagline">
            Set weekly themes, focus your time, and celebrate what you achieve.
          </p>
        </div>
        <button className="reset-button" type="button" onClick={resetWeek}>
          Start a fresh week
        </button>
      </header>

      <section className="summary" aria-label="Weekly focus summary">
        <div>
          <span className="summary__label">Total target</span>
          <strong>{summary.target.toFixed(1)}h</strong>
        </div>
        <div>
          <span className="summary__label">Time invested</span>
          <strong>{summary.spent.toFixed(1)}h</strong>
        </div>
        <div>
          <span className="summary__label">Achieved focus areas</span>
          <strong>
            {summary.achievedCount} / {focusItems.length}
          </strong>
        </div>
      </section>

      <section className="planner" aria-label="Plan weekly focus areas">
        <form className="planner__form" onSubmit={handleAddFocus}>
          <h2>Add a focus card</h2>
          <label className="planner__field">
            <span>Focus area</span>
            <input
              type="text"
              placeholder="e.g. Product strategy"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              required
            />
          </label>
          <label className="planner__field">
            <span>Target time (hours)</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={newTarget}
              onChange={(event) => setNewTarget(event.target.value)}
              required
            />
          </label>
          <button type="submit" className="primary-button">
            Add focus card
          </button>
        </form>

        <div className="planner__grid">
          {focusItems.length === 0 ? (
            <p className="empty-state">
              Start your week by creating a focus card above. Track how you spend
              your time and mark what you achieve.
            </p>
          ) : (
            focusItems.map((item) => {
              const isAchieved = item.spentHours >= item.targetHours;
              const sliderMax = Math.max(
                item.targetHours,
                item.spentHours,
                item.targetHours * 1.5,
              );
              const progressPercent = item.targetHours
                ? Math.min((item.spentHours / item.targetHours) * 100, 120)
                : 0;

              return (
                <article
                  key={item.id}
                  className={`focus-card${isAchieved ? ' focus-card--achieved' : ''}`}
                  aria-label={`${item.title} focus card`}
                >
                  <header className="focus-card__header">
                    <div>
                      <h3>{item.title}</h3>
                      <p className="focus-card__target">
                        Target {item.targetHours.toFixed(1)}h ·{' '}
                        {isAchieved ? 'Achieved' : 'In progress'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => removeFocusItem(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      ×
                    </button>
                  </header>

                  <div className="focus-card__progress" role="presentation">
                    <div className="progress-track" aria-hidden>
                      <div
                        className="progress-value"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="progress-stats">
                      <span>
                        <strong>{item.spentHours.toFixed(1)}h</strong> invested
                      </span>
                      {isAchieved && (
                        <span className="focus-card__badge">Achieved</span>
                      )}
                    </div>
                  </div>

                  <label className="focus-card__slider">
                    <span>Logged time</span>
                    <input
                      type="range"
                      min={0}
                      max={sliderMax}
                      step={0.25}
                      value={item.spentHours}
                      onChange={(event) =>
                        updateSpentHours(item.id, Number(event.target.value))
                      }
                      aria-label={`Logged hours for ${item.title}`}
                    />
                  </label>

                  <div className="focus-card__actions">
                    <div className="actions__group">
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, -0.5)}
                        disabled={item.spentHours <= 0}
                      >
                        -0.5h
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, 0.5)}
                      >
                        +0.5h
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, 1)}
                      >
                        +1h
                      </button>
                    </div>
                    <span className="focus-card__status">
                      {isAchieved
                        ? 'Nice work! Shift attention elsewhere.'
                        : 'Keep investing time here.'}
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
