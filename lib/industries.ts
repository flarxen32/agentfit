/**
 * Programmatic SEO data for industry-specific landing pages.
 *
 * Each entry targets a real long-tail search query our ICP searches:
 *   "AI automation for {industry}"
 *   "AI agents for {industry}"
 *
 * Pages are generated dynamically from this data — one page per industry,
 * each with unique tasks, ROI math, and a CTA to the free audit funnel.
 */

export interface IndustryAutomation {
  task: string;
  tool: string;
  hoursBefore: string;
  hoursAfter: string;
  difficulty: "Easy" | "Medium" | "Advanced";
}

export interface Industry {
  slug: string;
  name: string;
  /** The ICP persona within this industry. */
  persona: string;
  /** One-line hook unique to this industry. */
  hook: string;
  /** The top recurring pain point this persona faces. */
  painPoint: string;
  /** Unique automation opportunities for this industry. */
  automations: IndustryAutomation[];
  /** Estimated annual hours saved by automating the top 3 tasks. */
  annualHoursSaved: number;
  /** Estimated annual dollar value at $60/hr blended. */
  annualValue: number;
  /** SEO keywords this page targets. */
  keywords: string[];
  /** A specific, credible example of automation in this industry. */
  caseExample: {
    scenario: string;
    result: string;
  };
}

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    persona: "Independent agents and small brokerages (1-10 agents)",
    hook: "Real estate runs on speed. The agent who responds first wins the listing.",
    painPoint: "Lead response time. Studies show responding within 5 minutes makes you 21x more likely to qualify a lead — but most agents can't check Zillow/Realtor leads that fast while in showings.",
    automations: [
      { task: "Instant lead response", tool: "Zillow/Realtor.com + email agent", hoursBefore: "Manual checking every 30 min during showings", hoursAfter: "Agent responds in <60 seconds, books the viewing", difficulty: "Easy" },
      { task: "Listing description writing", tool: "MLS + property data", hoursBefore: "45 min per listing writing descriptions", hoursAfter: "Agent drafts 3 variations from photos + specs in 2 min", difficulty: "Easy" },
      { task: "CMO packet assembly", tool: "MLS comps + county records", hoursBefore: "2-3 hours per CMA pulling comps and formatting", hoursAfter: "Agent compiles a formatted CMA in 10 min", difficulty: "Medium" },
      { task: "Transaction document chasing", tool: "Dotloop + email", hoursBefore: "Following up with 5+ parties for signatures", hoursAfter: "Agent tracks deadlines and sends reminders automatically", difficulty: "Medium" },
    ],
    annualHoursSaved: 208,
    annualValue: 12480,
    keywords: ["AI automation for real estate", "AI agents for real estate agents", "automate real estate lead response", "AI for independent real estate brokers"],
    caseExample: {
      scenario: "A solo agent getting 15-20 internet leads/week from Zillow and Realtor.com",
      result: "Automated first-touch response within 60 seconds on all leads, pre-qualifying and booking showings — while the agent is in a closing or showing.",
    },
  },
  {
    slug: "accounting-firm",
    name: "Accounting & Bookkeeping",
    persona: "Small accounting firms and solo CPAs (1-5 people)",
    hook: "Accounting is 70% data movement. Every hour on data entry is an hour not spent on advisory work clients pay premium for.",
    painPoint: "Bank reconciliation and categorization during tax season. Solo CPAs lose entire Saturdays matching transactions that follow predictable patterns.",
    automations: [
      { task: "Bank feed categorization", tool: "QuickBooks/Xero + bank feeds", hoursBefore: "3-4 hours/week categorizing transactions", hoursAfter: "Agent pre-categorizes 90% using client history", difficulty: "Medium" },
      { task: "Receipt collection & matching", tool: "Email + Dext/expensify", hoursBefore: "Chasing clients for receipts, matching to transactions", hoursAfter: "Agent extracts receipt data from email, matches to bank feed", difficulty: "Medium" },
      { task: "Monthly client reporting", tool: "QBO + Google Sheets", hoursBefore: "45 min per client generating monthly reports", hoursAfter: "Agent compiles and emails the report on the 1st", difficulty: "Easy" },
      { task: "Tax deadline tracking", tool: "Calendar + client list", hoursBefore: "Manual tracking of 20+ client deadlines", hoursAfter: "Agent sends reminders to you and client 7 days out", difficulty: "Easy" },
    ],
    annualHoursSaved: 260,
    annualValue: 15600,
    keywords: ["AI automation for accounting firms", "AI for bookkeepers", "automate QuickBooks categorization", "AI agents for CPAs"],
    caseExample: {
      scenario: "A 3-person bookkeeping firm managing 40 monthly clients",
      result: "Automated bank categorization (90% accuracy using client history) and monthly report generation — recovering ~5 hours per week per staff member.",
    },
  },
  {
    slug: "law-firm",
    name: "Law Firms",
    persona: "Solo practitioners and small firms (1-8 attorneys)",
    hook: "Billable hours are everything. Every minute on non-billable admin is revenue you'll never recover.",
    painPoint: "Intake. Potential clients call 3-4 firms. The one who responds first with a structured intake usually gets the case.",
    automations: [
      { task: "Client intake & qualification", tool: "Website form + phone", hoursBefore: "30 min per lead doing intake calls", hoursAfter: "Agent collects case details, qualifies, books consult", difficulty: "Medium" },
      { task: "Document review & summarization", tool: "Email + PDF discovery docs", hoursBefore: "Hours reading 50+ page discovery documents", hoursAfter: "Agent summarizes key facts, flags items needing review", difficulty: "Advanced" },
      { task: "Billing & time entry", tool: "Clio/MyCase + email", hoursBefore: "End-of-week reconstructing billable time from memory", hoursAfter: "Agent logs time entries from calendar and email", difficulty: "Medium" },
      { task: "Deadline & filing reminders", tool: "Court calendar + case mgmt", hoursBefore: "Manual tracking of filing deadlines across cases", hoursAfter: "Agent sends deadline alerts 72h, 24h, and 4h out", difficulty: "Easy" },
    ],
    annualHoursSaved: 220,
    annualValue: 13200,
    keywords: ["AI automation for law firms", "AI for solo attorneys", "automate legal intake", "AI agents for small law firms"],
    caseExample: {
      scenario: "A solo personal injury attorney getting 8-12 intake calls/week",
      result: "Automated intake — agent collects case details 24/7, qualifies based on criteria, and books a consult. Catches leads that called outside business hours.",
    },
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    persona: "Shopify/WooCommerce store owners doing $50K-$500K/year",
    hook: "E-commerce is a volume game. Small inefficiencies compound across thousands of orders.",
    painPoint: "Customer support. 'Where is my order?' emails consume hours daily and follow an identical pattern.",
    automations: [
      { task: "Order status responses", tool: "Shopify + Gmail + carrier API", hoursBefore: "2 hours/day answering WISMO emails", hoursAfter: "Agent replies with tracking info in <2 min", difficulty: "Easy" },
      { task: "Product description writing", tool: "Shopify admin + supplier data", hoursBefore: "20 min per product writing descriptions", hoursAfter: "Agent drafts SEO descriptions from supplier specs", difficulty: "Easy" },
      { task: "Inventory reorder alerts", tool: "Shopify + supplier catalog", hoursBefore: "Manual stock checks, guessing reorder points", hoursAfter: "Agent flags low stock with suggested reorder qty", difficulty: "Medium" },
      { task: "Review response drafting", tool: "Shopify reviews + email", hoursBefore: "Responding to 10+ reviews/week individually", hoursAfter: "Agent drafts personalized responses for approval", difficulty: "Easy" },
    ],
    annualHoursSaved: 416,
    annualValue: 24960,
    keywords: ["AI automation for e-commerce", "AI agents for Shopify stores", "automate e-commerce customer support", "AI for online retail"],
    caseExample: {
      scenario: "A Shopify store doing $200K/year with 300+ SKUs",
      result: "Automated WISMO responses (80% of support tickets) and product descriptions for new SKUs — freeing the owner to focus on acquisition.",
    },
  },
  {
    slug: "marketing-agency",
    name: "Marketing Agencies",
    persona: "Boutique agencies (2-10 people) managing 5-20 clients",
    hook: "Agencies live and die by margins. Every hour spent on client reporting is an hour not spent on work that wins new business.",
    painPoint: "Client reporting. Pulling data from 5+ platforms into a deck every month, for every client.",
    automations: [
      { task: "Monthly client reporting", tool: "Google Analytics + Meta + ad platforms", hoursBefore: "3 hours per client compiling monthly reports", hoursAfter: "Agent generates formatted report from connected sources", difficulty: "Medium" },
      { task: "Competitor monitoring", tool: "SEMrush/Ahrefs + client list", hoursBefore: "Manual checks of competitor activity", hoursAfter: "Agent sends weekly competitor movement alerts", difficulty: "Easy" },
      { task: "Content repurposing", tool: "Client blog + social channels", hoursBefore: "Rewriting one piece for 4 channels", hoursAfter: "Agent generates platform-specific variations", difficulty: "Easy" },
      { task: "Lead qualification for new biz", tool: "Inbound form + LinkedIn", hoursBefore: "Researching every inbound lead manually", hoursAfter: "Agent compiles a 1-page brief on each prospect", difficulty: "Medium" },
    ],
    annualHoursSaved: 312,
    annualValue: 18720,
    keywords: ["AI automation for marketing agencies", "AI for digital agencies", "automate agency client reporting", "AI agents for boutique agencies"],
    caseExample: {
      scenario: "A 5-person digital marketing agency with 12 retainer clients",
      result: "Automated monthly reporting across GA4, Meta, and Google Ads — recovering ~36 hours/month of senior team time previously spent on decks.",
    },
  },
  {
    slug: "insurance-broker",
    name: "Insurance Brokers",
    persona: "Independent brokers and small agencies (1-8 agents)",
    hook: "Insurance is sold on trust and responsiveness. The broker who quotes first usually wins.",
    painPoint: "Quote preparation. Gathering data from multiple carriers for every prospect request, often outside business hours.",
    automations: [
      { task: "Quote request intake", tool: "Website + phone + email", hoursBefore: "15 min per lead collecting info for quotes", hoursAfter: "Agent collects all required fields, routes to carriers", difficulty: "Easy" },
      { task: "Policy renewal reminders", tool: "CRM + carrier systems", hoursBefore: "Manual tracking of 50+ renewal dates", hoursAfter: "Agent alerts broker + client 30/14/3 days out", difficulty: "Easy" },
      { task: "Claims status updates", tool: "Carrier portal + client email", hoursBefore: "Clients calling for claims status updates", hoursAfter: "Agent proactively texts claim status to clients", difficulty: "Medium" },
      { task: "Lead follow-up sequences", tool: "CRM + email + SMS", hoursBefore: "Inconsistent follow-up on cold leads", hoursAfter: "Agent runs 5-touch sequence over 14 days", difficulty: "Medium" },
    ],
    annualHoursSaved: 200,
    annualValue: 12000,
    keywords: ["AI automation for insurance brokers", "AI for independent insurance agents", "automate insurance quoting", "AI agents for insurance agencies"],
    caseExample: {
      scenario: "An independent P&C broker with 300 active policies",
      result: "Automated renewal reminders and quote intake — increasing renewal retention and capturing more inbound quote requests outside business hours.",
    },
  },
  {
    slug: "recruitment-agency",
    name: "Recruitment & Staffing",
    persona: "Boutique recruiters and staffing firms (1-10 people)",
    hook: "Recruiting is a race. The firm that sources and screens first places the candidate.",
    painPoint: "Initial candidate screening. Sourcing calls with clearly unqualified candidates waste hours every week.",
    automations: [
      { task: "Candidate sourcing & screening", tool: "LinkedIn + ATS", hoursBefore: "Hours sourcing and doing initial screens", hoursAfter: "Agent sources matching candidates, pre-screens via form", difficulty: "Medium" },
      { task: "Interview scheduling", tool: "Calendar + candidate email", hoursBefore: "Email tennis to find a slot with candidate + client", hoursAfter: "Agent coordinates calendars and books the interview", difficulty: "Easy" },
      { task: "Reference checking", tool: "Email + phone", hoursBefore: "30 min per placement calling references", hoursAfter: "Agent collects structured reference feedback via form", difficulty: "Easy" },
      { task: "Candidate nurture sequences", tool: "ATS + email", hoursBefore: "Silver-medal candidates go cold", hoursAfter: "Agent nurtures past candidates for future roles", difficulty: "Medium" },
    ],
    annualHoursSaved: 280,
    annualValue: 16800,
    keywords: ["AI automation for recruitment agencies", "AI for recruiters", "automate candidate screening", "AI agents for staffing firms"],
    caseExample: {
      scenario: "A 4-person tech recruiting firm placing 3-5 candidates/month",
      result: "Automated candidate screening forms and interview scheduling — cutting time-to-placement by 40%.",
    },
  },
  {
    slug: "property-management",
    name: "Property Management",
    persona: "Independent property managers (20-200 units)",
    hook: "Property management is 90% coordination. Missed maintenance requests cost you properties.",
    painPoint: "Maintenance request coordination. Tenants text, call, and email — requests get lost.",
    automations: [
      { task: "Maintenance request intake", tool: "Tenant portal + email + SMS", hoursBefore: "Requests scattered across channels, lost", hoursAfter: "Agent captures all requests in one system, routes to vendor", difficulty: "Easy" },
      { task: "Rent reminder & late follow-up", tool: "Accounting + tenant SMS", hoursBefore: "Calling late payers individually", hoursAfter: "Agent sends escalating reminders automatically", difficulty: "Easy" },
      { task: "Lease renewal management", tool: "Calendar + tenant records", hoursBefore: "Manual tracking of 50+ lease end dates", hoursAfter: "Agent initiates renewal process 60 days out", difficulty: "Medium" },
      { task: "Move-in/move-out inspection docs", tool: "Photos + inspection form", hoursBefore: "45 min per turnover writing up condition reports", hoursAfter: "Agent drafts report from photos + checklist", difficulty: "Medium" },
    ],
    annualHoursSaved: 240,
    annualValue: 14400,
    keywords: ["AI automation for property management", "AI for property managers", "automate maintenance requests", "AI agents for landlords"],
    caseExample: {
      scenario: "A property manager with 80 units across 12 buildings",
      result: "Unified maintenance request intake and automated rent reminders — eliminating lost requests and cutting late payments by 60%.",
    },
  },
  {
    slug: "consulting",
    name: "Consulting & Professional Services",
    persona: "Independent consultants and small advisory firms",
    hook: "Consultants sell expertise, not hours. Every hour on admin is expertise not being deployed for clients.",
    painPoint: "Proposal and report writing — high-value work trapped in repetitive document formats.",
    automations: [
      { task: "Proposal drafting", tool: "Past proposals + CRM notes", hoursBefore: "3-4 hours per proposal from scratch", hoursAfter: "Agent drafts from scope notes + past templates", difficulty: "Medium" },
      { task: "Client meeting prep", tool: "CRM + calendar + research", hoursBefore: "45 min researching client before each meeting", hoursAfter: "Agent compiles a 1-page brief automatically", difficulty: "Easy" },
      { task: "Engagement reporting", tool: "Notes + project data", hoursBefore: "Weekly status reports for 3-5 clients", hoursAfter: "Agent drafts status report from meeting notes", difficulty: "Easy" },
      { task: "Inbound lead qualification", tool: "Website + email", hoursBefore: "30-min discovery calls with unqualified leads", hoursAfter: "Agent pre-qualifies via structured form", difficulty: "Medium" },
    ],
    annualHoursSaved: 260,
    annualValue: 15600,
    keywords: ["AI automation for consulting", "AI for independent consultants", "automate consulting proposals", "AI agents for advisory firms"],
    caseExample: {
      scenario: "A solo strategy consultant running 3-4 active engagements",
      result: "Automated proposal drafting and client briefs — recovering 8-10 hours/week for billable client work.",
    },
  },
  {
    slug: "healthcare-practice",
    name: "Healthcare Practices",
    persona: "Small private practices (dentists, chiropractors, therapists, 1-5 providers)",
    hook: "Patients choose the practice that's easy to work with. Friction in scheduling or follow-up loses them.",
    painPoint: "No-shows and front-desk bandwidth. Every no-show is lost revenue.",
    automations: [
      { task: "Appointment reminders", tool: "EHR + SMS/email", hoursBefore: "Staff calling patients 2 days before", hoursAfter: "Agent sends SMS/email reminders, handles reschedules", difficulty: "Easy" },
      { task: "New patient intake", tool: "Paper forms + data entry", hoursBefore: "Staff re-entering paper forms into EHR", hoursAfter: "Agent sends digital form, populates EHR fields", difficulty: "Medium" },
      { task: "Insurance verification", tool: "Portal + phone", hoursBefore: "20 min per patient calling insurance", hoursAfter: "Agent pulls eligibility data, flags issues", difficulty: "Advanced" },
      { task: "Recare/recall campaigns", tool: "EHR patient list + SMS", hoursBefore: "Manual outreach to overdue patients", hoursAfter: "Agent runs 3-touch recall sequence automatically", difficulty: "Easy" },
    ],
    annualHoursSaved: 220,
    annualValue: 13200,
    keywords: ["AI automation for healthcare practices", "AI for dental offices", "automate patient reminders", "AI agents for private practices"],
    caseExample: {
      scenario: "A 3-dentist practice with 1,200 active patients",
      result: "Automated SMS reminders cut no-shows by 35%, and a recall campaign recovered 80 overdue patients in the first quarter.",
    },
  },
  {
    slug: "construction-contractor",
    name: "Construction & Contractors",
    persona: "General contractors, trades, and small construction firms (2-15 people)",
    hook: "Construction runs on bids and schedules. Late bids lose jobs; missed messages cost change orders.",
    painPoint: "Estimating and bid follow-up. GCs spend evenings turning quotes around.",
    automations: [
      { task: "Bid request intake", tool: "Email + project portals", hoursBefore: "Sorting bid invites, extracting scope", hoursAfter: "Agent extracts scope, deadlines, compiles bid packet", difficulty: "Medium" },
      { task: "Subcontractor coordination", tool: "Phone + text + email", hoursBefore: "Calling subs to confirm schedules", hoursAfter: "Agent texts subs with schedule, collects confirmations", difficulty: "Easy" },
      { task: "Change order documentation", tool: "Email + field notes", hoursBefore: "Writing up change orders after the fact", hoursAfter: "Agent drafts change order from field notes/email", difficulty: "Medium" },
      { task: "Invoice & payment follow-up", tool: "Accounting + client email", hoursBefore: "Chasing payments on completed work", hoursAfter: "Agent sends escalating payment reminders", difficulty: "Easy" },
    ],
    annualHoursSaved: 180,
    annualValue: 10800,
    keywords: ["AI automation for construction", "AI for general contractors", "automate construction bidding", "AI agents for trades"],
    caseExample: {
      scenario: "A GC with 4-6 active projects and 12 regular subs",
      result: "Automated subcontractor scheduling confirmations and bid intake — eliminating missed bids and schedule gaps.",
    },
  },
  {
    slug: "fitness-coaching",
    name: "Fitness & Coaching",
    persona: "Online coaches, personal trainers, and small studios",
    hook: "Coaches scale by systematizing. The ones who automate onboarding handle 3x more clients.",
    painPoint: "Client onboarding and check-ins. Spreadsheets and DMs don't scale past 20 clients.",
    automations: [
      { task: "Client onboarding", tool: "Website + intake forms", hoursBefore: "30 min per client onboarding calls", hoursAfter: "Agent collects goals, history, sends program welcome", difficulty: "Easy" },
      { task: "Weekly check-in collection", tool: "Spreadsheets + DMs", hoursBefore: "Chasing check-ins across WhatsApp/IG/email", hoursAfter: "Agent sends check-in form, compiles responses", difficulty: "Easy" },
      { task: "Program generation", tool: "Template library + client data", hoursBefore: "Writing individualized programs from scratch", hoursAfter: "Agent drafts programs from templates + client goals", difficulty: "Medium" },
      { task: "Payment & renewal reminders", tool: "Stripe + client list", hoursBefore: "Manual tracking of package expirations", hoursAfter: "Agent sends renewal prompts 7 days before expiry", difficulty: "Easy" },
    ],
    annualHoursSaved: 160,
    annualValue: 9600,
    keywords: ["AI automation for fitness coaching", "AI for personal trainers", "automate client check-ins", "AI agents for online coaches"],
    caseExample: {
      scenario: "An online fitness coach with 35 active clients",
      result: "Automated weekly check-in collection and program drafting — enabling the coach to take on 15 more clients without adding hours.",
    },
  },
  {
    slug: "nonprofit",
    name: "Nonprofits",
    persona: "Small nonprofits (1-10 staff) with limited budgets",
    hook: "Nonprofits do mission-critical work on skeleton crews. Automation multiplies small teams.",
    painPoint: "Donor management and grant tracking — critical work that always loses to urgent work.",
    automations: [
      { task: "Donor acknowledgment", tool: "Donation platform + email/mail", hoursBefore: "Writing individual thank-yous after each campaign", hoursAfter: "Agent drafts personalized acknowledgments", difficulty: "Easy" },
      { task: "Grant deadline tracking", tool: "Calendar + grant database", hoursBefore: "Missing grant deadlines or rushing applications", hoursAfter: "Agent tracks deadlines, sends prep reminders", difficulty: "Easy" },
      { task: "Volunteer coordination", tool: "Email + spreadsheets", hoursBefore: "Emailing volunteers individually for events", hoursAfter: "Agent sends targeted invites, tracks RSVPs", difficulty: "Medium" },
      { task: "Impact reporting", tool: "Program data + donor CRM", hoursBefore: "Compiling quarterly impact reports manually", hoursAfter: "Agent drafts report from program data", difficulty: "Medium" },
    ],
    annualHoursSaved: 180,
    annualValue: 10800,
    keywords: ["AI automation for nonprofits", "AI for small nonprofits", "automate donor management", "AI agents for charities"],
    caseExample: {
      scenario: "A 4-person nonprofit running 3 programs with 200 donors",
      result: "Automated donor acknowledgments and grant deadline tracking — ensuring no thank-you or deadline was missed.",
    },
  },
  {
    slug: "event-planning",
    name: "Event Planning",
    persona: "Independent event planners and small planning firms",
    hook: "Events are logistics cascades. One missed vendor email can unravel a wedding.",
    painPoint: "Vendor coordination across dozens of touchpoints with no central system.",
    automations: [
      { task: "Vendor RFP collection", tool: "Email + spreadsheets", hoursBefore: "Emailing vendors individually, tracking responses", hoursAfter: "Agent sends RFPs, compiles responses in one sheet", difficulty: "Medium" },
      { task: "Client milestone reminders", tool: "Timeline + client email", hoursBefore: "Manually tracking 30+ planning milestones", hoursAfter: "Agent sends milestone reminders to planner + client", difficulty: "Easy" },
      { task: "Guest list management", tool: "RSVP system + email", hoursBefore: "Tracking RSVPs and dietary requirements", hoursAfter: "Agent collects RSVPs, flags special requirements", difficulty: "Easy" },
      { task: "Post-event follow-up", tool: "Attendee list + email", hoursAfter: "Agent sends thank-yous + feedback forms", hoursBefore: "Post-event follow-up falls through the cracks", difficulty: "Easy" },
    ],
    annualHoursSaved: 200,
    annualValue: 12000,
    keywords: ["AI automation for event planning", "AI for event planners", "automate vendor coordination", "AI agents for wedding planners"],
    caseExample: {
      scenario: "A wedding planner managing 12 events per year",
      result: "Automated vendor RFP tracking and milestone reminders — eliminating dropped balls during peak season.",
    },
  },
  {
    slug: "saas-startup",
    name: "SaaS Startups",
    persona: "Early-stage SaaS founders and small teams (1-10 people)",
    hook: "At early stage, founder time is the bottleneck. Automating non-build work extends your runway.",
    painPoint: "Customer support and onboarding eating founder time that should go to product.",
    automations: [
      { task: "Support ticket triage", tool: "Intercom/Zendesk + knowledge base", hoursBefore: "Founder answering every ticket personally", hoursAfter: "Agent drafts responses from docs, escalates complex", difficulty: "Medium" },
      { task: "User onboarding emails", tool: "Product DB + email sequencer", hoursBefore: "Manual onboarding outreach to new signups", hoursAfter: "Agent runs a 5-email onboarding sequence", difficulty: "Easy" },
      { task: "Churn signals & save plays", tool: "Product analytics + CRM", hoursBefore: "Noticing churn risk too late", hoursAfter: "Agent flags at-risk accounts with save-play drafts", difficulty: "Advanced" },
      { task: "Competitor & feature tracking", tool: "Competitor changelogs + release notes", hoursBefore: "Manual monitoring of 5+ competitors", hoursAfter: "Agent sends weekly competitor movement digest", difficulty: "Easy" },
    ],
    annualHoursSaved: 280,
    annualValue: 16800,
    keywords: ["AI automation for SaaS startups", "AI for founders", "automate customer onboarding", "AI agents for early-stage SaaS"],
    caseExample: {
      scenario: "A 3-person SaaS startup with 200 early customers",
      result: "Automated support drafting and onboarding sequences — freeing the founder to focus on the product roadmap.",
    },
  },
  {
    slug: "graphic-design",
    name: "Graphic Design & Creative",
    persona: "Freelance designers and small creative studios (1-5 people)",
    hook: "Creative work is what clients pay for. Admin is what eats your margins.",
    painPoint: "Project intake, briefs, and revisions tracking — the uncreative work that surrounds creative work.",
    automations: [
      { task: "Client brief collection", tool: "Email + forms", hoursBefore: "Back-and-forth emails to nail down requirements", hoursAfter: "Agent sends structured brief form, compiles responses", difficulty: "Easy" },
      { task: "Revision tracking", tool: "Email + project tool", hoursBefore: "Losing track of which revision is current", hoursAfter: "Agent logs revisions, sends approval requests", difficulty: "Medium" },
      { task: "Invoicing & payment chase", tool: "Accounting + client email", hoursBefore: "Late invoicing, chasing payments", hoursAfter: "Agent generates invoices, sends payment reminders", difficulty: "Easy" },
      { task: "Portfolio updates", tool: "Website + project files", hoursBefore: "Never updating the portfolio", hoursAfter: "Agent drafts case studies from completed projects", difficulty: "Medium" },
    ],
    annualHoursSaved: 160,
    annualValue: 9600,
    keywords: ["AI automation for graphic designers", "AI for creative freelancers", "automate design project management", "AI agents for design studios"],
    caseExample: {
      scenario: "A freelance designer with 6-8 active projects",
      result: "Automated brief collection and revision tracking — eliminating scope creep and late invoices.",
    },
  },
  {
    slug: "home-services",
    name: "Home Services",
    persona: "Plumbers, electricians, HVAC, landscapers (1-8 technicians)",
    hook: "Home services is a dispatch game. The contractor who answers first gets the job.",
    painPoint: "Missed calls = missed jobs. Every call that goes to voicemail during a job is revenue lost.",
    automations: [
      { task: "Missed-call capture", tool: "Phone system + SMS", hoursBefore: "Calls go to voicemail during jobs, lost leads", hoursAfter: "Agent texts back instantly, captures job details", difficulty: "Easy" },
      { task: "Scheduling & dispatch", tool: "Calendar + technician phones", hoursBefore: "Calling techs to coordinate daily routes", hoursAfter: "Agent sends daily route, handles reschedule requests", difficulty: "Medium" },
      { task: "Quote follow-up", tool: "CRM + email/SMS", hoursBefore: "Quotes sent, no follow-up, deals go cold", hoursAfter: "Agent runs 3-touch follow-up on every quote", difficulty: "Easy" },
      { task: "Review request automation", tool: "Job completion + Google/Google Business", hoursBefore: "Forgetting to ask for reviews", hoursAfter: "Agent texts review request after job completion", difficulty: "Easy" },
    ],
    annualHoursSaved: 200,
    annualValue: 12000,
    keywords: ["AI automation for home services", "AI for plumbers and electricians", "automate HVAC dispatch", "AI agents for contractors"],
    caseExample: {
      scenario: "A 4-tech HVAC company doing 15-20 service calls/day",
      result: "Automated missed-call capture and review requests — recovering 8-10 lost jobs/month and tripling Google reviews.",
    },
  },
  {
    slug: "hr-consulting",
    name: "HR Consulting",
    persona: "Independent HR consultants and small HR firms",
    hook: "HR consulting is document-heavy. Standardized policies and processes eat hours.",
    painPoint: "Policy drafting and employee handbook updates — repetitive work billed at premium rates.",
    automations: [
      { task: "Policy & handbook drafting", tool: "Templates + client context", hoursBefore: "4-6 hours drafting handbooks from scratch", hoursAfter: "Agent drafts from templates + client specifics", difficulty: "Medium" },
      { task: "Compliance deadline tracking", tool: "Calendar + client roster", hoursBefore: "Missing client compliance deadlines", hoursAfter: "Agent tracks deadlines, sends prep reminders", difficulty: "Easy" },
      { task: "Onboarding checklist management", tool: "HRIS + email", hoursBefore: "Manual onboarding tracking per client", hoursAfter: "Agent runs onboarding sequences per client", difficulty: "Medium" },
      { task: "Exit interview processing", tool: "Forms + summary reports", hoursBefore: "Compiling exit interview themes manually", hoursAfter: "Agent summarizes trends across departures", difficulty: "Easy" },
    ],
    annualHoursSaved: 200,
    annualValue: 12000,
    keywords: ["AI automation for HR consulting", "AI for HR consultants", "automate HR documentation", "AI agents for HR firms"],
    caseExample: {
      scenario: "An HR consultant managing 8 retainer clients",
      result: "Automated handbook drafting and compliance tracking — enabling the consultant to take on 3 more clients.",
    },
  },
  {
    slug: "photography",
    name: "Photography",
    persona: "Wedding, portrait, and commercial photographers",
    hook: "Photographers spend more time on emails than behind the camera. Automation fixes that.",
    painPoint: "Inquiry response and gallery delivery — the business side of photography.",
    automations: [
      { task: "Inquiry response", tool: "Website + email", hoursBefore: "Hours responding to similar inquiries individually", hoursAfter: "Agent sends personalized response + availability", difficulty: "Easy" },
      { task: "Contract & invoice collection", tool: "CRM + e-signature", hoursBefore: "Chasing signed contracts and deposits", hoursAfter: "Agent sends contract, follows up, confirms deposit", difficulty: "Easy" },
      { task: "Gallery delivery follow-up", tool: "Gallery platform + email", hoursBefore: "Clients not ordering prints, no follow-up", hoursAfter: "Agent nudges clients with print deadlines", difficulty: "Easy" },
      { task: "Post-shoot workflow", tool: "Culling + editing notes", hoursBefore: "Manual tagging and culling workflow", hoursAfter: "Agent pre-tags and organizes shoot by subject", difficulty: "Medium" },
    ],
    annualHoursSaved: 160,
    annualValue: 9600,
    keywords: ["AI automation for photographers", "AI for photography studios", "automate client communication", "AI agents for wedding photographers"],
    caseExample: {
      scenario: "A wedding photographer shooting 20 weddings/year",
      result: "Automated inquiry response and contract chasing — booking 30% more inquiries and recovering evenings.",
    },
  },
  {
    slug: "financial-advisor",
    name: "Financial Advisors",
    persona: "Independent financial advisors and small RIAs (1-5 advisors)",
    hook: "Trust and proactive communication retain clients. Automation makes consistency possible.",
    painPoint: "Client communication cadence — the work that differentiates you but always gets deprioritized.",
    automations: [
      { task: "Client review prep", tool: "CRM + portfolio data", hoursBefore: "45 min per client prepping for reviews", hoursAfter: "Agent compiles performance summary + talking points", difficulty: "Medium" },
      { task: "Birthday & milestone outreach", tool: "CRM + email", hoursBefore: "Inconsistent personal touch", hoursAfter: "Agent sends personalized notes on milestones", difficulty: "Easy" },
      { task: "Prospect nurture sequences", tool: "CRM + email sequencer", hoursBefore: "Cold prospects go quiet", hoursAfter: "Agent runs educational content sequence", difficulty: "Medium" },
      { task: "Compliance documentation", tool: "Notes + CRM", hoursBefore: "End-of-week documenting client calls", hoursAfter: "Agent logs call notes into CRM from recordings", difficulty: "Medium" },
    ],
    annualHoursSaved: 200,
    annualValue: 12000,
    keywords: ["AI automation for financial advisors", "AI for RIAs", "automate client communication", "AI agents for wealth management"],
    caseExample: {
      scenario: "An IAR with 80 client households",
      result: "Automated review prep and milestone outreach — increasing client retention and freeing time for new client acquisition.",
    },
  },
];

/**
 * Total number of industry pages generated — used by the hub page.
 */
export const industryCount = industries.length;

/**
 * Helper to look up an industry by slug.
 */
export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
