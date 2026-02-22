import { useEffect, useState } from "react";
import { MapPin, Clock, Send, CheckCircle, Star } from "lucide-react";

import apiFetch from "../utils/apiFetch";
import { useToast } from "../admin/components/ToastProvider";

interface JobOpening {
  id: number;
  title: string;
  field: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

function CareersPage() {
  const { showToast } = useToast();

  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  // -------------------------
  // Fetch job openings
  // -------------------------
  const fetchJobs = async () => {
    try {
      const res = await apiFetch("/careers/");
      setJobOpenings(res);
    } catch {
      showToast("error", "خطا در دریافت فرصت‌های تدریس");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchJobs();
  }, []);

  // -------------------------
  // Redirect to BecomeInstructorPage
  // -------------------------
  const handleApply = (job: JobOpening) => {
    const specialty = encodeURIComponent(job.field || job.title);
    window.location.href = `/become-instructor?specialty=${specialty}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">فرصت‌های تدریس</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          اگر توانایی تدریس دارید، ما مشتاق همکاری با شما هستیم
        </p>
      </div>

      {/* Job Openings */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">موقعیت‌های تدریس باز</h2>

        {loading ? (
          <p className="text-center text-gray-400 py-10">در حال بارگذاری...</p>
        ) : jobOpenings.length === 0 ? (
          <p className="text-center text-gray-400 py-10">در حال حاضر فرصت فعالی وجود ندارد</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job) => (
              <div key={job.id} className="glass rounded-xl p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                        {job.field}
                      </span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                  >
                    {selectedJob === job.id ? "بستن" : "جزئیات"}
                  </button>
                </div>

                <p className="text-gray-300 mb-4">{job.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                </div>

                {selectedJob === job.id && (
                  <div className="border-t border-white/10 pt-4 mt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">الزامات:</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2 space-x-reverse">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">مزایا:</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2 space-x-reverse">
                            <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleApply(job)}
                    className="glow-button px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 space-x-reverse"
                  >
                    <Send className="h-4 w-4" />
                    <span>درخواست همکاری</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default CareersPage;
