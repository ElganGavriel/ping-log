import { useState, useEffect } from 'react';
import { useMeQuery, useUpdateProfileMutation, WageMode } from '../generated/graphql.generated';
import NavBar from '../components/NavBar';
import { CURRENCIES } from '../lib/currencies';

export default function SettingsPage() {
  const { data, loading } = useMeQuery();
  const [updateProfile, { loading: saving }] = useUpdateProfileMutation();

  const [currency, setCurrency] = useState('USD');
  const [wageMode, setWageMode] = useState<WageMode>(WageMode.Hourly);
  const [hourlyWage, setHourlyWage] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!data?.me) return;
    setCurrency(data.me.currency ?? 'USD');
    setWageMode(data.me.wageMode ?? WageMode.Hourly);
    setHourlyWage(data.me.hourlyWage != null ? String(data.me.hourlyWage) : '');
    setMonthlySalary(data.me.monthlySalary != null ? String(data.me.monthlySalary) : '');
    setHoursPerWeek(data.me.hoursPerWeek != null ? String(data.me.hoursPerWeek) : '40');
  }, [data?.me]);

  if (loading && !data) {
    return (
      <div className="container">
        <p className="subtitle">Loading...</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    await updateProfile({
      variables: {
        input: {
          currency,
          wageMode,
          hourlyWage: wageMode === WageMode.Hourly ? parseFloat(hourlyWage) || 0 : undefined,
          monthlySalary: wageMode === WageMode.Salary ? parseFloat(monthlySalary) || 0 : undefined,
          hoursPerWeek: wageMode === WageMode.Salary ? parseFloat(hoursPerWeek) || 40 : undefined,
        },
      },
    });
    setSaved(true);
  };

  return (
    <div className="container">
      <NavBar displayName={data?.me?.displayName} />
      <header>
        <h1>⚙️ Settings</h1>
        <p className="subtitle">Set your wage once — the stopwatch does the rest.</p>
      </header>

      <section className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Currency
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Pay type
              <select value={wageMode} onChange={(e) => setWageMode(e.target.value as WageMode)}>
                <option value={WageMode.Hourly}>Hourly wage</option>
                <option value={WageMode.Salary}>Monthly salary</option>
              </select>
            </label>
          </div>

          {wageMode === WageMode.Hourly ? (
            <div className="form-row">
              <label>
                Hourly wage
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(e.target.value)}
                  required
                />
              </label>
            </div>
          ) : (
            <div className="form-row">
              <label>
                Monthly salary
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                  required
                />
              </label>
              <label>
                Hours per week
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  required
                />
              </label>
            </div>
          )}

          <button className="btn btn-start" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          {saved && <p className="subtitle">Saved.</p>}
        </form>
      </section>
    </div>
  );
}
