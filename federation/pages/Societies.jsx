import React, { useState } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { createSociety } from "../../src/lib/societiesApi";

function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
  let pwd = "";
  for (let i = 0; i < 10; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export default function FederationSocieties() {
  const { session } = useAuth();

  const [societyName, setSocietyName] = useState("");
  const [region, setRegion] = useState("");
  const [state, setState] = useState("Punjab");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");

  // Society ID is generated server-side (e.g. "soc_40dd1dde735d"), so
  // there's nothing to fake client-side anymore. Password IS sent to
  // the backend, so we still generate a starting one here.
  const [password, setPassword] = useState(() => generatePassword());
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successInfo, setSuccessInfo] = useState(null); // { societyId, password }

  const [recentSocieties, setRecentSocieties] = useState([]);

  const regeneratePassword = () => setPassword(generatePassword());

  const resetForm = () => {
    setSocietyName("");
    setRegion("");
    setState("Punjab");
    setContactName("");
    setPhone("");
    setPassword(generatePassword());
  };

  const handleCreateSociety = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessInfo(null);

    if (!societyName || !region || !contactName || !phone || !password) {
      setError("Fill in every field before creating the society.");
      return;
    }

    setIsLoading(true);
    try {
      const created = await createSociety(
        {
          name: societyName,
          district: region,
          state,
          society_head: contactName,
          contact_phone: phone,
          password,
        },
        session?.token
      );

      // Backend has returned this as a plain object in testing, but
      // handle a single-item array too in case that ever changes.
      const society = Array.isArray(created) ? created[0] : created;

      setSuccessInfo({
        societyId: society?.society_id ?? "—",
        password,
      });

      setRecentSocieties((prev) => [
        {
          name: society?.name ?? societyName,
          id: society?.society_id ?? "—",
          created: "Just now",
        },
        ...prev,
      ]);

      resetForm();
    } catch (err) {
      setError(err.message || "Couldn't create the society. Try again.");
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-[#172033]">
            Create society
          </h1>

          <p className="mt-1 text-base text-stone-500">
            Provision a new cooperative society and generate its admin login.
          </p>

          <form
            onSubmit={handleCreateSociety}
            className="mt-8 rounded-2xl border border-stone-200 bg-white p-9 shadow-sm"
          >
            <h2 className="text-base font-semibold text-[#26395F]">
              Society details
            </h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm text-stone-500">
                Society name
              </label>
              <input
                type="text"
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
                placeholder="e.g. Kapurthala Handicrafts Cooperative"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-stone-500">
                Region / district
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Kapurthala"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              />
            </div>

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
                <option>Bihar</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-stone-500">
                Society Head
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Simran Kaur"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-stone-500">
                Contact phone number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-base text-[#30384A] outline-none transition focus:border-[#1F3157] focus:ring-2 focus:ring-[#1F3157]/10"
              />
            </div>

            <div className="my-7 border-t border-stone-200" />

            <h2 className="flex items-center gap-3 text-base font-semibold text-[#26395F]">
              <span className="text-sm">□</span>
              Login credentials
            </h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm text-stone-500">
                Society ID
              </label>
              <input
                type="text"
                value="Generated automatically after creation"
                readOnly
                className="w-full rounded-xl border border-stone-200 bg-stone-100 px-4 py-3 text-base text-stone-400 outline-none"
              />
            </div>

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

            <div className="mt-5 flex gap-3 rounded-xl bg-[#EEF2F8] px-4 py-4 text-sm leading-6 text-[#314568]">
              <span className="mt-0.5">□</span>
              <p>
                Share these credentials securely with the society admin. They
                can change the password after first login.
              </p>
            </div>

            {error && (
              <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {successInfo && (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
                <p className="font-semibold">Society created successfully.</p>
                <p className="mt-1">
                  Society ID:{" "}
                  <span className="font-mono">{successInfo.societyId}</span>
                  <br />
                  Temporary password:{" "}
                  <span className="font-mono">{successInfo.password}</span>
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-stone-200 bg-white px-6 py-3 text-base text-stone-600 transition hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-[#1F3157] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#172746] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  "Creating..."
                ) : (
                  <>
                    Create society and generate
                    <br />
                    credentials
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Recently Created — session-only for now. Real list/view
              page comes next, using GET /admin/societies. */}
          <div className="mt-7 rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">
            <h2 className="text-sm font-semibold text-stone-500">
              Recently created societies
            </h2>

            <div className="mt-5">
              {recentSocieties.length === 0 && (
                <p className="text-sm text-stone-400">
                  No societies created yet this session.
                </p>
              )}

              {recentSocieties.map((society, index) => (
                <div
                  key={society.id + index}
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