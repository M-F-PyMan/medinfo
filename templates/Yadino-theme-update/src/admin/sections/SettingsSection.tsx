import React, { useEffect, useState } from "react";
import { useToast } from "../components/ToastProvider";
import { AdminUser } from "../api/auth";

const BASE_URL = "http://localhost:8000/api/";

interface Settings {
  site_name: string;
  site_description: string;

  logo: string | null;
  favicon: string | null;

  support_email: string;
  support_phone: string;
  address: string;

  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  telegram: string;

  default_meta_title: string;
  default_meta_description: string;
  default_og_image: string | null;

  zarinpal_merchant_id: string;
  idpay_api_key: string;
  stripe_public_key: string;
  stripe_secret_key: string;

  smtp_host: string;
  smtp_port: number | null;
  smtp_username: string;
  smtp_password: string;
  smtp_use_tls: boolean;
  smtp_use_ssl: boolean;

  sms_api_key: string;
  sms_sender_number: string;
}

interface Props {
  currentUser: AdminUser | null;
}

const tabs = [
  { id: "general", label: "عمومی" },
  { id: "contact", label: "تماس" },
  { id: "social", label: "شبکه‌های اجتماعی" },
  { id: "seo", label: "SEO" },
  { id: "payment", label: "پرداخت" },
  { id: "smtp", label: "SMTP" },
  { id: "sms", label: "SMS" },
];

export const SettingsSection: React.FC<Props> = ({ currentUser }) => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<Settings | null>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [ogFile, setOgFile] = useState<File | null>(null);

  const token = localStorage.getItem("adminAccessToken");

  const load = async () => {
    try {
      const res = await fetch(BASE_URL + "admin/settings/", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setSettings(data);
    } catch {
      showToast("error", "خطا در دریافت تنظیمات");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!settings) return;

    const fd = new FormData();

    Object.entries(settings).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        fd.append(key, String(value));
      }
    });

    if (logoFile) fd.append("logo", logoFile);
    if (faviconFile) fd.append("favicon", faviconFile);
    if (ogFile) fd.append("default_og_image", ogFile);

    try {
      const res = await fetch(BASE_URL + "admin/settings/", {
        method: "PUT",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        body: fd,
      });

      if (!res.ok) throw new Error("Failed");

      showToast("success", "تنظیمات ذخیره شد");
      load();
    } catch {
      showToast("error", "خطا در ذخیره تنظیمات");
    }
  };

  if (!settings) {
    return (
      <div className="text-white text-center py-10">
        در حال بارگذاری تنظیمات...
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="نام سایت"
              value={settings.site_name}
              onChange={(e) =>
                setSettings({ ...settings, site_name: e.target.value })
              }
              className="input"
            />

            <textarea
              placeholder="توضیحات سایت"
              value={settings.site_description}
              onChange={(e) =>
                setSettings({ ...settings, site_description: e.target.value })
              }
              className="input"
              rows={3}
            />

            {/* Logo */}
            <div>
              <label className="text-gray-300 text-sm">لوگو</label>
              <input
                type="file"
                onChange={(e) =>
                  setLogoFile(e.target.files ? e.target.files[0] : null)
                }
                className="text-gray-300 mt-2"
              />
              {settings.logo && !logoFile && (
                <img
                  src={settings.logo}
                  className="w-24 h-24 object-contain mt-2"
                />
              )}
            </div>

            {/* Favicon */}
            <div>
              <label className="text-gray-300 text-sm">فاوآیکون</label>
              <input
                type="file"
                onChange={(e) =>
                  setFaviconFile(e.target.files ? e.target.files[0] : null)
                }
                className="text-gray-300 mt-2"
              />
              {settings.favicon && !faviconFile && (
                <img
                  src={settings.favicon}
                  className="w-12 h-12 object-contain mt-2"
                />
              )}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="ایمیل پشتیبانی"
              value={settings.support_email}
              onChange={(e) =>
                setSettings({ ...settings, support_email: e.target.value })
              }
              className="input"
            />

            <input
              type="text"
              placeholder="شماره تماس"
              value={settings.support_phone}
              onChange={(e) =>
                setSettings({ ...settings, support_phone: e.target.value })
              }
              className="input"
            />

            <textarea
              placeholder="آدرس"
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
              className="input"
              rows={3}
            />
          </div>
        );

      case "social":
        return (
          <div className="space-y-4">
            {["instagram", "twitter", "linkedin", "youtube", "telegram"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={(settings as any)[field] || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, [field]: e.target.value })
                  }
                  className="input"
                />
              )
            )}
          </div>
        );

      case "seo":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Meta Title"
              value={settings.default_meta_title}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  default_meta_title: e.target.value,
                })
              }
              className="input"
            />

            <textarea
              placeholder="Meta Description"
              value={settings.default_meta_description}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  default_meta_description: e.target.value,
                })
              }
              className="input"
              rows={3}
            />

            <div>
              <label className="text-gray-300 text-sm">OG Image</label>
              <input
                type="file"
                onChange={(e) =>
                  setOgFile(e.target.files ? e.target.files[0] : null)
                }
                className="text-gray-300 mt-2"
              />
              {settings.default_og_image && !ogFile && (
                <img
                  src={settings.default_og_image}
                  className="w-32 h-20 object-cover mt-2 rounded-lg"
                />
              )}
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="زرین‌پال Merchant ID"
              value={settings.zarinpal_merchant_id}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  zarinpal_merchant_id: e.target.value,
                })
              }
              className="input"
            />

            <input
              type="text"
              placeholder="IDPay API Key"
              value={settings.idpay_api_key}
              onChange={(e) =>
                setSettings({ ...settings, idpay_api_key: e.target.value })
              }
              className="input"
            />

            <input
              type="text"
              placeholder="Stripe Public Key"
              value={settings.stripe_public_key}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stripe_public_key: e.target.value,
                })
              }
              className="input"
            />

            <input
              type="text"
              placeholder="Stripe Secret Key"
              value={settings.stripe_secret_key}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stripe_secret_key: e.target.value,
                })
              }
              className="input"
            />
          </div>
        );

      case "smtp":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="SMTP Host"
              value={settings.smtp_host}
              onChange={(e) =>
                setSettings({ ...settings, smtp_host: e.target.value })
              }
              className="input"
            />

            <input
              type="number"
              placeholder="SMTP Port"
              value={settings.smtp_port || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtp_port: Number(e.target.value),
                })
              }
              className="input"
            />

            <input
              type="text"
              placeholder="SMTP Username"
              value={settings.smtp_username}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtp_username: e.target.value,
                })
              }
              className="input"
            />

            <input
              type="password"
              placeholder="SMTP Password"
              value={settings.smtp_password}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtp_password: e.target.value,
                })
              }
              className="input"
            />

            <label className="flex items-center space-x-2 space-x-reverse text-gray-300">
              <input
                type="checkbox"
                checked={settings.smtp_use_tls}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtp_use_tls: e.target.checked,
                  })
                }
              />
              <span>Use TLS</span>
            </label>

            <label className="flex items-center space-x-2 space-x-reverse text-gray-300">
              <input
                type="checkbox"
                checked={settings.smtp_use_ssl}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtp_use_ssl: e.target.checked,
                  })
                }
              />
              <span>Use SSL</span>
            </label>
          </div>
        );

      case "sms":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="SMS API Key"
              value={settings.sms_api_key}
              onChange={(e) =>
                setSettings({ ...settings, sms_api_key: e.target.value })
              }
              className="input"
            />

            <input
              type="text"
              placeholder="SMS Sender Number"
              value={settings.sms_sender_number}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  sms_sender_number: e.target.value,
                })
              }
              className="input"
            />
          </div>
        );
    }
  };

  return (
    <div className="flex gap-6">
      {/* Side Tabs */}
      <div className="w-48 glass rounded-xl p-4 h-fit space-y-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`w-full text-right px-4 py-2 rounded-lg transition ${
              activeTab === t.id
                ? "bg-white/10 text-white border border-white/10"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 glass rounded-xl p-6 space-y-6">
        {renderTabContent()}

        <button onClick={save} className="glow-button w-full py-3 rounded-lg">
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
};
