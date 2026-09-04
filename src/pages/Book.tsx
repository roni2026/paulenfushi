import { useState } from 'react';

const u = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const villaTypes = [
  'Beach Villa',
  'Beach Villa with Pool',
  'Water Villa',
  'Water Villa with Pool',
  'Sunset Water Villa',
  'Two-Bedroom Beach Residence',
  'Paulenfushi Private Residence',
];

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    checkin: '',
    checkout: '',
    adults: '2',
    children: '0',
    villaType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    promo: '',
    notes: '',
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <div className="pt-16 lg:pt-[72px] min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center px-6 max-w-lg">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gold block mb-5">ENQUIRY RECEIVED</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal font-light mb-6">
            Your island escape begins.
          </h2>
          <p className="font-sans text-base text-charcoal/60 leading-loose mb-10">
            Thank you. Our reservations team will be in touch within 24 hours with availability and a personalised proposal for your stay.
          </p>
          <p className="font-sans text-sm text-charcoal/40">
            Reservations: <a href="mailto:reservations@paulenfushi.com" className="text-gold hover:underline">reservations@paulenfushi.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-[72px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative hidden lg:block">
          <img
            src={u('1561501900-3701fa6a0864', 900, 1200)}
            alt="Book your stay at Paulenfushi"
            className="sticky top-0 w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-midnight/30" />
          <div className="absolute bottom-12 left-12 right-12">
            <p className="font-serif text-3xl lg:text-4xl text-softwhite font-light italic leading-tight mb-4">
              &ldquo;Your island escape begins here.&rdquo;
            </p>
            <p className="font-sans text-[11px] tracking-[0.3em] text-gold">PAULENFUSHI RESORT &amp; SPA</p>
          </div>
        </div>

        <div className="bg-ivory px-8 lg:px-16 py-16 flex flex-col justify-center">
          <div className="max-w-lg">
            <p className="font-sans text-[10px] tracking-[0.45em] text-gold mb-5">RESERVATIONS</p>
            <h1 className="font-serif text-4xl lg:text-5xl font-light text-charcoal mb-2">Book Your Stay</h1>
            <p className="font-sans text-sm text-charcoal/50 mb-12 leading-relaxed">
              Complete the form and our team will prepare a personalised proposal within 24 hours.
            </p>

            <div className="mb-4 border border-charcoal/15 bg-softwhite px-5 py-4">
              <p className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 mb-1">DESTINATION</p>
              <p className="font-sans text-sm text-charcoal">Paulenfushi Resort &amp; Spa, Maldives</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="border border-charcoal/15 bg-softwhite">
                <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">CHECK-IN</label>
                <input
                  type="date"
                  value={form.checkin}
                  onChange={(e) => set('checkin', e.target.value)}
                  className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none"
                />
              </div>
              <div className="border border-charcoal/15 bg-softwhite">
                <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">CHECK-OUT</label>
                <input
                  type="date"
                  value={form.checkout}
                  onChange={(e) => set('checkout', e.target.value)}
                  className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="border border-charcoal/15 bg-softwhite">
                <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">ADULTS</label>
                <select value={form.adults} onChange={(e) => set('adults', e.target.value)} className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none appearance-none">
                  {['1', '2', '3', '4', '5', '6'].map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="border border-charcoal/15 bg-softwhite">
                <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">CHILDREN</label>
                <select value={form.children} onChange={(e) => set('children', e.target.value)} className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none appearance-none">
                  {['0', '1', '2', '3', '4'].map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="border border-charcoal/15 bg-softwhite mb-4">
              <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">VILLA TYPE</label>
              <select value={form.villaType} onChange={(e) => set('villaType', e.target.value)} className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none appearance-none">
                <option value="">Select villa type</option>
                {villaTypes.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[{ label: 'FIRST NAME', key: 'firstName' as const }, { label: 'LAST NAME', key: 'lastName' as const }].map((f) => (
                <div key={f.key} className="border border-charcoal/15 bg-softwhite">
                  <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">{f.label}</label>
                  <input
                    type="text"
                    value={form[f.key]}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none"
                    placeholder="—"
                  />
                </div>
              ))}
            </div>
            <div className="border border-charcoal/15 bg-softwhite mb-4">
              <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">EMAIL ADDRESS</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div className="border border-charcoal/15 bg-softwhite mb-4">
              <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">PHONE (OPTIONAL)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none"
                placeholder="+1 000 000 0000"
              />
            </div>
            <div className="border border-charcoal/15 bg-softwhite mb-4">
              <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">PROMO CODE (OPTIONAL)</label>
              <input
                type="text"
                value={form.promo}
                onChange={(e) => set('promo', e.target.value)}
                className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none"
                placeholder="Enter code"
              />
            </div>
            <div className="border border-charcoal/15 bg-softwhite mb-8">
              <label className="font-sans text-[9px] tracking-[0.3em] text-charcoal/40 px-4 pt-3 block">SPECIAL REQUESTS (OPTIONAL)</label>
              <textarea
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                rows={3}
                className="w-full bg-transparent font-sans text-sm text-charcoal px-4 pb-3 outline-none resize-none"
                placeholder="Honeymoon, dietary requirements, any special occasions..."
              />
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full bg-ocean text-softwhite font-sans text-[11px] tracking-[0.25em] py-5 hover:bg-gold transition-colors duration-300 mb-6"
            >
              CHECK AVAILABILITY
            </button>

            <p className="font-sans text-xs text-charcoal/40 leading-relaxed text-center">
              Alternatively, contact our reservations team directly at{' '}
              <a href="mailto:reservations@paulenfushi.com" className="text-gold hover:underline">
                reservations@paulenfushi.com
              </a>{' '}
              or call <a href="tel:+9604007000" className="text-gold hover:underline">+960 400 7000</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
