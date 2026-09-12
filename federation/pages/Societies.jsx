import React, { useState } from "react";

export default function FederationSocieties() {
  const [societyName, setSocietyName] = useState(
    "Kapurthala Handicrafts Cooperative"
  );
  const [region, setRegion] = useState("Kapurthala");
  const [state, setState] = useState("Punjab");
  const [contactName, setContactName] = useState("Simran Kaur");
  const [phone, setPhone] = useState("+91 98765 43210");

  const [societyId, setSocietyId] = useState("SOC-KPT-014");
  const [password, setPassword] = useState("Temp@12345");

  const [showPassword, setShowPassword] = useState(false);

  const [recentSocieties] = useState([
    {
      name: "Jalandhar Weavers Society",
      id: "SOC-JAL-013",
      created: "Created 2 days ago",
    },
    {
      name: "Amritsar Craft Collective",
      id: "SOC-ASR-012",
      created: "Created 5 days ago",
    },
    {
      name: "Ludhiana Home Workers Coop",
      id: "SOC-LDH-011",
      created: "Created 1 week ago",
    },
  ]);

  const regenerateId = () => {
    const random = Math.floor(100 + Math.random() * 900);
    setSocietyId(`SOC-KPT-${random}`);
  };

  const regeneratePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
    let newPassword = "";

    for (let i = 0; i < 10; i++) {
      newPassword += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(newPassword);
  };

  const handleCreateSociety = (e) => {
    e.preventDefault();

    console.log("Creating society:", {
      societyName,
      region,
      state,
      contactName,
      phone,
      societyId,
      password,
    });

    alert(
      `Society created successfully!\n\nSociety ID: ${societyId}\nTemporary Password: ${password}`
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header */}
      <div className="flex h-20 items-center justify-between border-b border-stone-200 px-10">
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-400">Societies</span>

          <span className="text-stone-300">/</span>

          <span className="text-sm font-semibold text-[#141B33]">
            Create new society
          </span>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3157] text-sm font-semibold text-white">
          FA
        </div>
      </div>

      {/* Main Content */}
      <main className="px-10 py-10">
        <div className="max-w-3xl">
          {/* Page Heading */}
          <h1 className="text-2xl font-bold text-[#172033]">
            Create society
          </h1>

          <p className="mt-1 text-base text-stone-500">
            Provision a new cooperative society and generate its admin login.
          </p>

          {/* Form Card */}
          <form
            onSubmit={handleCreateSociety}
            className="mt-8 rounded-2xl border border-stone-200 bg-white p-9 shadow-sm"
          >
            {/* Society Details */}
            <h2 className="text-base font-semibold text-[#26395F]">
              Society details
            </h2>

            {/* Society Name */}
            <div className="mt-6">
              <label className="mb-2 block text-sm text-stone-500">
                Society name
              </label>

              <input
                type="text"
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              />
            </div>

            {/* Region */}
            <div className="mt-5">
              <label className="mb-2 block text-sm text-stone-500">
                Region / district
              </label>

              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              />
            </div>

            {/* State */}
            <div className="mt-5">
              <label className="mb-2 block text-sm text-stone-500">
                State
              </label>

              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full appearance-auto rounded-xl border border-stone-200 bg-white px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              >
                <option>Punjab</option>
                <option>Haryana</option>
                <option>Himachal Pradesh</option>
                <option>Delhi</option>
                <option>Uttar Pradesh</option>
                <option>Rajasthan</option>
                <option>Jammu and Kashmir</option>
              </select>
            </div>

            {/* Contact Person */}
            <div className="mt-5">
              <label className="mb-2 block text-sm text-stone-500">
                  Society Head
              </label>

              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              />
            </div>

            {/* Phone */}
            <div className="mt-5">
              <label className="mb-2 block text-sm text-stone-500">
                Contact phone number
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              />
            </div>

            {/* Divider */}
            <div className="my-7 border-t border-stone-200" />

            {/* Login Credentials */}
            <h2 className="flex items-center gap-3 text-base font-semibold text-[#26395F]">
              <span className="text-sm">□</span>
              Login credentials
            </h2>

            {/* Society ID */}
            <div className="mt-6">
              <label className="mb-2 block text-sm text-stone-500">
                Society ID
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={societyId}
                  readOnly
                  className="flex-1 rounded-xl border border-stone-200 bg-stone-100 px-4 py-3 text-base text-stone-500 outline-none"
                />

                <button
                  type="button"
                  onClick={regenerateId}
                  className="text-sm font-semibold text-[#26395F] hover:underline"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Temporary Password */}
            <div className="mt-5">
              <label className="mb-2 block text-sm text-stone-500">
                Temporary password
              </label>

              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    readOnly
                    className="w-full rounded-xl border border-stone-200 px-4 py-3 pr-12 text-base text-[#30384A] outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
                  >
                    {showPassword ? "◉" : "□"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={regeneratePassword}
                  className="text-sm font-semibold text-[#26395F] hover:underline"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Security Information */}
            <div className="mt-5 flex gap-3 rounded-xl bg-[#EEF2F8] px-4 py-4 text-sm leading-6 text-[#314568]">
              <span className="mt-0.5">□</span>

              <p>
                Share these credentials securely with the society admin. They
                can change the password after first login.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-end gap-4">
              <button
                type="button"
                className="rounded-xl border border-stone-200 bg-white px-6 py-3 text-base text-stone-600 transition hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-[#1F3157] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#172746]"
              >
                Create society and generate
                <br />
                credentials
              </button>
            </div>
          </form>

          {/* Recently Created */}
          <div className="mt-7 rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">
            <h2 className="text-sm font-semibold text-stone-500">
              Recently created societies
            </h2>

            <div className="mt-5">
              {recentSocieties.map((society, index) => (
                <div
                  key={society.id}
                  className={`flex items-center justify-between py-4 ${
                    index !== recentSocieties.length - 1
                      ? "border-b border-stone-100"
                      : ""
                  }`}
                >
                  <div>
                    <p className="text-base font-medium text-[#30384A]">
                      {society.name}
                    </p>

                    <p className="mt-1 text-sm text-stone-400">
                      {society.id} · {society.created}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 text-stone-500 hover:bg-stone-50"
                  >
                    □
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}