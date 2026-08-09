import { type FormEvent, useState } from 'react';
import { Arrow } from '../../components/Arrow.tsx';
import { PageMeta } from '../../components/PageMeta.tsx';
import { whatsappUrl } from '../../data.ts';

export function StartPage() {
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const budget = String(data.get('budget') || '').trim();
    const requirements = String(data.get('requirements') || '').trim();

    if (!name || !budget || !requirements) {
      setError('Add your name, budget and what you need the PC to do.');
      return;
    }

    setError('');
    const message = [
      `Hi Assembly Line, I’m ${name}. I’d like help planning a custom PC.`,
      `Use: ${String(data.get('useCase') || 'Not specified')}`,
      `Budget: ${budget}`,
      `Location: ${String(data.get('location') || 'Not specified')}`,
      `What I need: ${requirements}`,
    ].join('\n');

    window.location.assign(whatsappUrl(message));
  }

  return (
    <>
      <PageMeta
        title="Plan your custom PC - Assembly Line"
        description="Share your use case and budget with Assembly Line, then continue the conversation with a PC enthusiast on WhatsApp."
      />
      <section className="start-page shell">
        <div className="start-page__intro">
          <p className="eyebrow">Your build brief</p>
          <h1>Give us the context a parts list cannot.</h1>
          <p>Answer four short questions. We will format your brief and open it in WhatsApp, where a real person from our team can take over.</p>
          <div className="start-page__promise">
            <span>What happens next</span>
            <ol>
              <li>We read the brief and ask what is missing.</li>
              <li>We suggest a balanced direction and explain why.</li>
              <li>You decide if and when to move ahead.</li>
            </ol>
          </div>
        </div>
        <form className="brief-form" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label><span>Your name *</span><input name="name" autoComplete="name" placeholder="How should we address you?" /></label>
            <label><span>Your location</span><input name="location" autoComplete="address-level2" placeholder="City or delivery location" /></label>
          </div>
          <label>
            <span>Main use</span>
            <select name="useCase" defaultValue="Gaming">
              <option>Gaming</option>
              <option>Content creation</option>
              <option>3D / VFX / architecture</option>
              <option>AI / development</option>
              <option>Office / business</option>
              <option>A mix of uses</option>
            </select>
          </label>
          <label><span>Comfortable budget *</span><input name="budget" inputMode="text" placeholder="For example, ₹1.2-1.5 lakh" /></label>
          <label><span>What should this PC do well? *</span><textarea name="requirements" rows={6} placeholder="Games or apps, monitor resolution, parts you already own, noise or size preferences, and anything else that matters." /></label>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button className="button button--primary button--full" type="submit">Continue in WhatsApp <Arrow /></button>
          <p className="form-note">Your answers stay in your browser until you choose to open WhatsApp.</p>
        </form>
      </section>
    </>
  );
}
