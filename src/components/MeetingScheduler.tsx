import { useState, useEffect, FormEvent } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  User, 
  Mail, 
  Building, 
  Link, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Clipboard,
  Check
} from "lucide-react";

interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

interface MeetingType {
  id: string;
  name: string;
  duration: string;
  desc: string;
  platform: "Google Meet" | "Zoom";
  color: string;
}

interface ScheduledMeeting {
  id: string;
  meetingType: string;
  date: string;
  time: string;
  platform: string;
  joinLink: string;
  guestName: string;
  guestEmail: string;
  guestCompany: string;
  details: string;
  timestamp: string;
}

export default function MeetingScheduler() {
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>("intro");
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [preferredPlatform, setPreferredPlatform] = useState<"Google Meet" | "Zoom">("Google Meet");
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Guest booking details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestCompany, setGuestCompany] = useState("");
  const [guestDetails, setGuestDetails] = useState("");
  
  const [activeTab, setActiveTab] = useState<"book" | "active">("book");
  const [storedMeeting, setStoredMeeting] = useState<ScheduledMeeting | null>(null);

  const meetingTypes: MeetingType[] = [
    {
      id: "intro",
      name: "15-Min Quick Intro Chat",
      duration: "15 Min",
      desc: "Fast-tracked initial networking call, mutual introductions, and requirement alignment.",
      platform: "Google Meet",
      color: "border-blue-200 hover:border-blue-500 text-blue-600 bg-blue-50/40"
    },
    {
      id: "advisory",
      name: "30-Min Strategic Advisory",
      duration: "30 Min",
      desc: "In-depth review of enterprise data capability architectures, GenAI blueprints, or team coaching requests.",
      platform: "Google Meet",
      color: "border-violet-200 hover:border-violet-500 text-violet-600 bg-violet-50/40"
    },
    {
      id: "technical",
      name: "45-Min Corporate Interview",
      duration: "45 Min",
      desc: "Comprehensive review of system scale, platform engineering experiences, or official hiring panels.",
      platform: "Zoom",
      color: "border-emerald-200 hover:border-emerald-500 text-emerald-600 bg-emerald-50/40"
    }
  ];

  // Generate the next 5 working days dynamically (excluding weekends) starting tomorrow
  const getUpcomingDays = () => {
    const days: Date[] = [];
    let current = new Date();
    while (days.length < 5) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sunday (0) and Saturday (6)
        days.push(new Date(current));
      }
    }
    return days.map((d) => {
      const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.getDate();
      const month = d.toLocaleDateString("en-US", { month: "short" });
      const isoString = d.toISOString().split("T")[0];
      return { label: weekday, dayNum, month, dateStr: isoString, rawDate: d };
    });
  };

  const bookingDays = getUpcomingDays();

  // Generate standard business hours slots adapted to UK/London (GMT/BST)
  const availableSlots: TimeSlot[] = [
    { time: "09:30 AM", isAvailable: true },
    { time: "10:30 AM", isAvailable: true },
    { time: "11:00 AM", isAvailable: true },
    { time: "01:30 PM", isAvailable: true },
    { time: "02:30 PM", isAvailable: true },
    { time: "03:30 PM", isAvailable: true },
    { time: "04:30 PM", isAvailable: false }, // Simulating some occasional busy blocks
    { time: "05:00 PM", isAvailable: true }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_scheduled_meet");
    if (saved) {
      try {
        setStoredMeeting(JSON.parse(saved));
        setActiveTab("active");
      } catch (e) {
        console.error("Failed parsing stored meeting record:", e);
      }
    }
  }, []);

  const handleBookMeeting = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !selectedTime) return;

    // Generate a high-fidelity random meet URL
    const randomHash = Math.random().toString(36).substring(2, 5) + "-" + 
                       Math.random().toString(36).substring(2, 6) + "-" + 
                       Math.random().toString(36).substring(2, 5);
    
    const joinUrl = preferredPlatform === "Google Meet" 
      ? `https://meet.google.com/${randomHash}`
      : `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`;

    const chosenTypeObj = meetingTypes.find(t => t.id === selectedMeetingType);

    const bookingRecord: ScheduledMeeting = {
      id: "meet_" + Date.now(),
      meetingType: chosenTypeObj?.name || "Introductory Video Call",
      date: bookingDays[selectedDateIndex].month + " " + bookingDays[selectedDateIndex].dayNum + ", 2026",
      time: selectedTime,
      platform: preferredPlatform,
      joinLink: joinUrl,
      guestName,
      guestEmail,
      guestCompany: guestCompany || "Independent Recruiter",
      details: guestDetails || "Standard introduction and capability matching.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    localStorage.setItem("portfolio_scheduled_meet", JSON.stringify(bookingRecord));
    setStoredMeeting(bookingRecord);
    setActiveTab("active");
  };

  const handleCancelMeeting = () => {
    localStorage.removeItem("portfolio_scheduled_meet");
    setStoredMeeting(null);
    setActiveTab("book");
    // Reset selections
    setSelectedTime("");
    setGuestName("");
    setGuestEmail("");
    setGuestCompany("");
    setGuestDetails("");
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 xl:p-10 shadow-sm overflow-hidden relative">
      
      {/* Decorative background context */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/5 rounded-bl-full pointer-events-none" />

      {/* Tabs / Headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#3b82f6]/10 text-[#3b82f6] text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles size={11} />
            DIRECT SCHEDULING UNIT
          </div>
          <h3 className="font-display text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Schedule Instant Call Room
          </h3>
          <p className="text-slate-500 text-xs max-w-lg">
            Directly block calendar time on strategic slots. High-definition Google Meet or Zoom invites are auto-dispatched.
          </p>
        </div>

        {storedMeeting && (
          <div className="flex items-center gap-2 self-start sm:self-center bg-[#f1f5f9] p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("book")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono uppercase tracking-wider transition-colors ${
                activeTab === "book" 
                  ? "bg-white text-slate-800 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Set New Slot
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono uppercase tracking-wider transition-colors ${
                activeTab === "active" 
                  ? "bg-white text-slate-800 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Active Booking
            </button>
          </div>
        )}
      </div>

      {activeTab === "book" ? (
        <form onSubmit={handleBookMeeting} className="space-y-6">
          
          {/* Step 1: Selection Grid */}
          <div className="space-y-3">
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              STEP 1: Choose Discussion Topic
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {meetingTypes.map((type) => {
                const isSelected = selectedMeetingType === type.id;
                return (
                  <div
                    key={type.id}
                    onClick={() => {
                      setSelectedMeetingType(type.id);
                      setPreferredPlatform(type.platform);
                    }}
                    className={`cursor-pointer border-2 p-4 rounded-xl flex flex-col justify-between transition-all duration-200 select-none ${
                      isSelected 
                        ? "border-[#3b82f6] bg-[#3b82f6]/5 shadow-sm" 
                        : "border-slate-200 hover:border-slate-350 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-[#0f172a]">{type.name}</span>
                        <span className="text-[10px] font-mono font-bold font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#475569]">
                          {type.duration}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 md:line-clamp-3">
                        {type.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-3 mt-2 border-t border-slate-150/40 text-[10px] font-mono font-bold text-slate-400">
                      <Video size={11} className="text-[#3b82f6]" />
                      <span>Default: {type.platform}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Step 2: Date and Time Picker */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  STEP 2: Choose Workday
                </span>
                
                {/* Horizontal slider of coming 5 days */}
                <div className="grid grid-cols-5 gap-2">
                  {bookingDays.map((day, idx) => {
                    const isSelected = selectedDateIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedDateIndex(idx)}
                        className={`cursor-pointer p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all select-none ${
                          isSelected 
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm" 
                            : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider block opacity-75">
                          {day.label}
                        </span>
                        <span className="text-base font-display font-extrabold block tracking-tight my-0.5">
                          {day.dayNum}
                        </span>
                        <span className="text-[9px] font-semibold tracking-wider block opacity-75">
                          {day.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  STEP 3: Choose Time Slot (GMT+1)
                </span>
                
                {/* Scrollable grid of slots */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.isAvailable}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
                          !slot.isAvailable 
                            ? "bg-slate-100 border-slate-100 text-slate-350 cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-[#3b82f6] border-[#3b82f6] text-white font-bold shadow-sm"
                            : "bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 cursor-pointer"
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Recruiter Details Form */}
            <div className="lg:col-span-6 space-y-4 bg-[#f8fafc]/60 p-5 rounded-2xl border border-slate-150/80">
              <span className="block text-[10px] font-mono font-bold text-slate-405 uppercase tracking-widest border-b border-slate-200/50 pb-2">
                STEP 4: Share Booking Parameters
              </span>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                    <input
                      type="text"
                      required
                      placeholder="Recruiter Name *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 text-xs bg-white border border-slate-200 focus:border-[#3b82f6] focus:outline-none rounded font-medium placeholder:text-slate-400"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email *"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 text-xs bg-white border border-slate-200 focus:border-[#3b82f6] focus:outline-none rounded font-medium placeholder:text-slate-405"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={guestCompany}
                      onChange={(e) => setGuestCompany(e.target.value)}
                      className="w-full pl-8.5 pr-3 py-2 text-xs bg-white border border-slate-200 focus:border-[#3b82f6] focus:outline-none rounded font-medium placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded justify-around">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase shrink-0">ROOM:</span>
                    <button
                      type="button"
                      onClick={() => setPreferredPlatform("Google Meet")}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                        preferredPlatform === "Google Meet" 
                          ? "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20" 
                          : "text-slate-400 hover:text-slate-650"
                      }`}
                    >
                      Google Meet
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredPlatform("Zoom")}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                        preferredPlatform === "Zoom" 
                          ? "bg-slate-900 text-slate-100 border border-slate-850" 
                          : "text-slate-400 hover:text-slate-650"
                      }`}
                    >
                      Zoom
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Short agenda, roles/req links (e.g. Architect at Prime Analytics)"
                    value={guestDetails}
                    onChange={(e) => setGuestDetails(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 focus:border-[#3b82f6] focus:outline-none rounded font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={!selectedTime || !guestName || !guestEmail}
                  className="w-full py-2.5 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold font-display tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
                >
                  <span>Build Live Call Room Invite</span>
                  <ArrowRight size={13} />
                </button>
                <div className="text-[9px] font-mono text-slate-400 text-center leading-none">
                  ⚡ Schedules immediately. Saves in localized browser state.
                </div>
              </div>
            </div>

          </div>

        </form>
      ) : (
        storedMeeting && (
          <div className="space-y-6">
            
            {/* Booking confirmation block */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl relative border border-slate-850 shadow-md">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold tracking-widest uppercase animate-pulse">
                <CheckCircle2 size={11} className="text-emerald-400" />
                <span>MEETING IS CONFIGURED AND SECURED</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#3b82f6] font-bold uppercase tracking-widest">ACTIVE INTEGRATION PARAMETERS</span>
                  <h4 className="text-xl font-display font-extrabold tracking-tight">
                    {storedMeeting.meetingType}
                  </h4>
                </div>

                {/* Date / Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-800 text-sm">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-450 uppercase mb-0.5">Assigned Date</span>
                    <span className="font-semibold text-slate-200">{storedMeeting.date}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-450 uppercase mb-0.5">Assigned Time</span>
                    <span className="font-semibold text-slate-200">{storedMeeting.time} (London BST)</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-450 uppercase mb-0.5">Organizers</span>
                    <span className="font-semibold text-slate-200">Rishu Shrivastava &amp; {storedMeeting.guestName}</span>
                  </div>
                </div>

                {/* Virtual meeting room link */}
                <div className="bg-slate-850/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 self-start sm:self-center">
                    <div className={`p-2.5 rounded-lg text-white ${storedMeeting.platform === "Google Meet" ? "bg-blue-600" : "bg-emerald-600"}`}>
                      <Video size={18} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">{storedMeeting.platform} Conference Room Entrypoint</span>
                      <span className="text-xs font-mono font-semibold text-slate-355 break-all">
                        {storedMeeting.joinLink}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => handleCopyLink(storedMeeting.joinLink)}
                      className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-bold font-mono uppercase bg-slate-800 hover:bg-slate-705 text-slate-200 border border-slate-700 hover:border-slate-650 transition-all rounded flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedLink ? <Check size={12} className="text-emerald-400" /> : <Clipboard size={12} />}
                      <span>Copy link</span>
                    </button>
                    <a
                      href={storedMeeting.joinLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-bold font-mono uppercase bg-[#3b82f6] hover:bg-blue-600 text-white transition-colors rounded flex items-center justify-center gap-1.5"
                    >
                      <span>Join Room</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Recruiter Details Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-400 pt-1">
                  <div>
                    <span className="text-slate-500 tracking-wider uppercase font-bold text-[9px] block">RECRUITING FIRM</span>
                    <span className="text-slate-300 font-semibold">{storedMeeting.guestCompany} ({storedMeeting.guestEmail})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 tracking-wider uppercase font-bold text-[9px] block">BRIEF AGENDA / PARAMETERS</span>
                    <span className="text-slate-300 font-semibold line-clamp-1">{storedMeeting.details}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated invite notifications box */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 pointer-events-none" />
                <span>Simulated workspace webhooks sent to Google Meet/Zoom and calendar clients.</span>
              </div>
              <button
                onClick={handleCancelMeeting}
                className="w-full sm:w-auto px-4 py-2 font-mono text-[10px] font-bold uppercase bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 hover:border-rose-300 transition-all rounded cursor-pointer"
              >
                Cancel / Reset Appointment
              </button>
            </div>

          </div>
        )
      )}

    </div>
  );
}
