// server/index.ts
import express2 from "express";
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  categories = [];
  constructor() {
  }
  setCategories(categories) {
    this.categories = categories;
  }
  async getCategories() {
    return this.categories;
  }
  async getProject(id) {
    for (const category of this.categories) {
      const project = category.projects.find((p) => p.id === id);
      if (project) return project;
    }
    return null;
  }
};
var storage = new MemStorage();

// client/src/lib/mock-data.ts
function generateMockData() {
  return [
    {
      id: "campaign-performance",
      title: "\u{1F4CA} Campaign Performance",
      icon: "chart-line",
      description: "Cross-channel KPIs and brand lift dashboards designed to monitor performance trends and support ongoing optimizations",
      projects: [
        {
          id: "entertainment-streaming",
          title: "Entertainment Account - Streaming Platform",
          category: "campaign-performance",
          client: "Entertainment Streaming Platform",
          description: "Connect fragmented data to measure what matters across OLV, Linear, CTV, social, and digital for a major series premiere",
          whyReason: "Executives needed a unified, daily view of campaign health across Linear, OLV, social, CTV and digital to guide rapid budget decisions during a time-sensitive launch window.",
          howMethod: "Integrated data from DV360, Social UI's, GAM, and a cross-media measurement partner into a Tableau dashboard. Metrics like reach, video completion, and CTR were monitored daily. Brand lift data was also included post-campaign to assess awareness and engagement shifts beyond click-based performance.",
          budget: "$2.4M",
          duration: "8 weeks",
          tools: ["Tableau", "DV360", "Meta Ads Manager", "GAM", "Cross-Media Measurement Partner"],
          metrics: [
            { label: "Total Reach", value: "24.8M", change: "+18%", trend: "up" },
            { label: "CTR", value: "2.4%", change: "+0.3%", trend: "up" },
            { label: "CPM", value: "$4.20", change: "-15%", trend: "down" },
            { label: "Video Completion Rate", value: "89%", change: "+12%", trend: "up" }
          ],
          chartData: {
            type: "line",
            title: "Multi-Platform Performance: Tune-in Attribution vs Reach vs Brand Lift",
            data: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
              datasets: [
                {
                  label: "OLV Tune-in Attribution Rate (%)",
                  data: [18, 20, 22, 24, 23, 25, 24, 25],
                  borderColor: "#14b8a6",
                  yAxisID: "y",
                  tension: 0.3
                },
                {
                  label: "Social Tune-in Attribution Rate (%)",
                  data: [35, 38, 40, 42, 41, 43, 42, 42],
                  borderColor: "#0d9488",
                  yAxisID: "y",
                  tension: 0.3
                },
                {
                  label: "Cumulative Reach (M)",
                  data: [2.8, 5.4, 8.9, 13.2, 17.8, 22.1, 25.7, 28.9],
                  borderColor: "#475569",
                  yAxisID: "y1",
                  borderDash: [10, 5],
                  tension: 0.2
                },
                {
                  label: "Brand Awareness Lift (%)",
                  data: [0, 0.4, 0.8, 1.3, 1.8, 2.2, 2.8, 3.2],
                  borderColor: "#2dd4bf",
                  yAxisID: "y1",
                  backgroundColor: "rgba(45, 212, 191, 0.1)",
                  fill: true,
                  tension: 0.4
                }
              ]
            }
          },
          chartSummary: "The campaign reached 24.8M viewers, with social outperforming industry benchmarks by 23% and contributing 42% of attributed tune-ins. However, OLV CTR was slower to ramp than expected early in flight, requiring mid-campaign creative swaps. Awareness increased by 3.2%, with completion rates improving after frequency capping adjustments.",
          whatWorked: [
            "Social video drove the highest engagement among 18\u201334 audiences",
            "OLV was most effective during primetime hours, supporting future dayparting strategy",
            "Frequency capping increased completion rates by 23%",
            "Creative refresh mid-flight helped recover underperforming placements"
          ],
          whatDidnt: [
            "OLV CTR underdelivered in the first half of flight due to misaligned audience targeting",
            "Initial reporting cadence wasn't fast enough for daily optimization \u2014 resolved by adding automated Tableau extracts",
            "Brand lift results were directionally positive but did not exceed benchmarks for younger audiences"
          ]
        },
        {
          id: "mobile-gaming-app",
          title: "Mobile Gaming - User Acquisition",
          category: "campaign-performance",
          client: "Mobile Gaming Studio",
          description: "Drive high-quality app installs and early retention through creative and channel optimization across mobile ad platforms",
          whyReason: "The product team needed better visibility into daily acquisition performance in order to fine-tune creative rotation, adjust media pacing, and increase retention among newly acquired users.",
          howMethod: "Built an automated Tableau dashboard using data from AppsFlyer, Facebook, Google, Unity, and TikTok. Grouped users by install date to track 7-day retention and early engagement. Used CPI, ROAS, and retention signals to adjust pacing, prioritize winning creatives, and test platform-specific audience segments.",
          budget: "$850K",
          duration: "12 weeks",
          tools: ["AppsFlyer", "Facebook Ads Manager", "Google Ads", "Unity Ads", "TikTok for Business", "Tableau"],
          metrics: [
            { label: "App Installs", value: "312K", change: "+27%", trend: "up" },
            { label: "CPI", value: "$2.84", change: "-18%", trend: "down" },
            { label: "D7 Retention", value: "68%", change: "+8%", trend: "up" },
            { label: "ROAS", value: "4.2x", change: "+35%", trend: "up" }
          ],
          chartData: {
            type: "funnel-combo",
            data: {
              labels: ["Impressions", "Clicks", "App Store Visits", "Installs", "D7 Retention"],
              datasets: [
                {
                  label: "Impressions (Millions)",
                  data: [54.2, 0, 0, 0, 0],
                  type: "line",
                  borderColor: "#14b8a6",
                  backgroundColor: "#14b8a6",
                  yAxisID: "y1",
                  pointRadius: 6,
                  pointHoverRadius: 8
                },
                {
                  label: "Funnel Metrics",
                  data: [0, 13e5, 847e3, 312e3, 212160],
                  backgroundColor: ["#475569", "#0d9488", "#14b8a6", "#2dd4bf", "#64748b"],
                  yAxisID: "y"
                }
              ]
            }
          },
          chartSummary: "The campaign delivered 312K installs with a CPI of $2.84 and a 68% 7-day retention rate. Creative and audience optimizations led to a 4.2x ROAS. However, early spend on interest-based targeting underperformed against lookalike models, prompting a shift in budget mid-flight.",
          whatWorked: [
            "Lookalike audiences outperformed interest targeting by 43%",
            "iOS users showed 23% higher LTV, justifying premium bids",
            "UGC-style creatives drove 67% higher install rates than polished videos",
            "Paid efforts paired with App Store optimization boosted organic installs by 18%",
            "60% of high-value users engaged within 24 hours \u2014 a key early retention signal"
          ],
          whatDidnt: [
            "Interest targeting delivered lower-quality users with below-average D7 retention",
            "High-performing creatives fatigued quickly on TikTok, requiring frequent swaps",
            "Initial install surge led to over-indexing on CPI, masking early retention gaps until segmented analysis was applied"
          ]
        },
        {
          id: "b2b-tech-leads",
          title: "B2B Tech - Account-Based Marketing Performance",
          category: "campaign-performance",
          client: "Enterprise Software Company",
          description: "Connect CRM and media data to evaluate account-level engagement and drive pipeline performance through ABM optimization",
          whyReason: "Sales and marketing lacked visibility into how media exposure was influencing key accounts. They needed clearer signals to tie paid media efforts to qualified pipeline activity.",
          howMethod: "Connected Salesforce CRM data with exposure data from LinkedIn, DV360, and Google Ads. Built account-level dashboards in Tableau to track MQL-to-SQL progression and evaluate which campaigns were influencing deals. Insights were used to optimize targeting, creative, and budget allocation mid-flight.",
          budget: "$340K",
          duration: "16 weeks",
          tools: ["Tableau", "Salesforce", "LinkedIn Campaign Manager", "DV360", "Google Ads"],
          metrics: [
            { label: "MQLs Generated", value: "1,247", change: "+31%", trend: "up" },
            { label: "SQL Conversion", value: "27%", change: "+4%", trend: "up" },
            { label: "Pipeline Value", value: "$2.8M", change: "+42%", trend: "up" },
            { label: "Cost per MQL", value: "$272", change: "-18%", trend: "down" }
          ],
          chartData: {
            type: "bar",
            data: {
              labels: ["LinkedIn Ads", "Google Search", "Display", "Content Syndication"],
              datasets: [
                {
                  label: "MQLs",
                  data: [456, 321, 287, 183],
                  backgroundColor: "#14b8a6"
                },
                {
                  label: "Pipeline ($K)",
                  data: [1200, 890, 450, 260],
                  backgroundColor: "#0d9488",
                  yAxisID: "y1"
                }
              ]
            }
          },
          chartSummary: "The campaign drove 1,247 MQLs and $2.8M in influenced pipeline, with a 27% SQL conversion rate. Early targeting was too broad, pulling in lower-fit accounts, so mid-flight list refinements were needed to improve lead quality and reduce funnel drop-off.",
          whatWorked: [
            "Cross-channel targeting improved engagement across high-priority accounts",
            "Content syndication drove the strongest MQL-to-SQL progression",
            "Lookalike and intent-based segments improved lead quality by 45%",
            "Executive-level reporting helped align media strategy with sales goals"
          ],
          whatDidnt: [
            "Early audience criteria were too loose, leading to weaker MQL quality",
            "Delays in attribution made it harder to adjust underperforming tactics quickly",
            "Sales follow-up was inconsistent in two key verticals",
            "Channel-level ROAS couldn't be fully calculated due to platform limitations"
          ]
        }
      ]
    },
    {
      id: "media-mix",
      title: "\u{1F4B0} Media Mix & ROI",
      icon: "dollar-sign",
      description: "Budget allocation optimization and media mix modeling to maximize ROAS across paid channels",
      projects: [
        {
          id: "streaming-mmm",
          title: "Entertainment Studio - Media Mix Modeling",
          category: "media-mix",
          client: "Major Entertainment Studio",
          description: "Model ROI across Linear, CTV, Digital, and Social to reallocate $150M in media spend more efficiently",
          whyReason: "With $150M+ in annual media spend, leadership needed a clear data-driven view of which platforms were driving the most incremental value \u2014 and where to reduce investment due to diminishing returns.",
          howMethod: "Used two years of campaign data to build a media mix model incorporating platform-level ROAS, reach, and carryover effects. Visualized diminishing returns curves, saturation thresholds, and what-if budget scenarios in Tableau to inform reallocation decisions. Model was used to guide strategic shifts across Linear TV, CTV, Digital Video, and Social.",
          budget: "$150M",
          duration: "6 months analysis",
          tools: ["Tableau", "Nielsen", "TVision", "Kantar", "VideoAmp", "comScore"],
          metrics: [
            { label: "Overall ROAS", value: "2.8x", change: "+0.3x", trend: "up" },
            { label: "Incremental Revenue", value: "$42M", change: "+15%", trend: "up" },
            { label: "Media Efficiency", value: "65%", change: "+8%", trend: "up" },
            { label: "Optimal Reallocation", value: "12%", trend: "neutral" }
          ],
          chartData: {
            type: "scatter",
            data: {
              datasets: [
                {
                  label: "Linear TV",
                  data: [{ x: 45, y: 4.2 }],
                  backgroundColor: "#0d9488"
                },
                {
                  label: "CTV",
                  data: [{ x: 25, y: 5.8 }],
                  backgroundColor: "#14b8a6"
                },
                {
                  label: "Digital Video",
                  data: [{ x: 20, y: 3.1 }],
                  backgroundColor: "#2dd4bf"
                },
                {
                  label: "Social",
                  data: [{ x: 10, y: 2.9 }],
                  backgroundColor: "#475569"
                }
              ]
            }
          },
          chartSummary: "The model revealed a 12% reallocation opportunity, shifting budget from over-saturated Linear to higher-performing CTV and Digital. While total ROAS improved to 2.8x, Social underperformed on conversion despite strong awareness, highlighting a creative and audience mismatch that needed further testing.",
          whatWorked: [
            "CTV drove highest incremental ROAS (5.8x), justifying a 15% budget increase",
            "Tableau dashboards helped visualize efficiency curves and defend reallocations",
            "Identifying Linear TV's saturation point ($65M) prevented overinvestment",
            "Holistic budget balance improved overall channel impact by 23%"
          ],
          whatDidnt: [
            "Social drove high reach but weak conversion, suggesting a creative/audience misalignment",
            "Attribution gaps made it difficult to fully isolate impact of upper-funnel channels",
            "Some historical campaign data lacked granularity, limiting early iterations of the model"
          ]
        },
        {
          id: "publisher-attribution",
          title: "Lifestyle Publisher - Cross-Channel Attribution",
          category: "media-mix",
          client: "Digital Lifestyle Publisher",
          description: "Move beyond last-click to reveal true revenue impact of programmatic, content, and direct sales channels",
          whyReason: "Last-click attribution was undervaluing upper-funnel channels and limiting the team's ability to optimize full-funnel performance and investment strategy.",
          howMethod: "Built a custom attribution model using Shapley value methodology. Integrated data across digital media, programmatic, sponsored content, and direct sales using GA360 and BigQuery. Visualized performance in Looker Studio to surface hidden value and inform smarter allocation decisions.",
          budget: "$5.2M",
          duration: "4 months",
          tools: ["BigQuery", "Looker Studio", "Google Analytics 360", "Shapley Value Analysis"],
          metrics: [
            { label: "Total Revenue", value: "$5.2M", change: "+23%", trend: "up" },
            { label: "Attribution Accuracy", value: "+27%", trend: "up" },
            { label: "Revenue Per Visit", value: "$3.47", change: "+18%", trend: "up" },
            { label: "Fill Rate", value: "94%", change: "+6%", trend: "up" }
          ],
          chartData: {
            type: "stacked-bar",
            data: {
              labels: ["Q1", "Q2", "Q3", "Q4"],
              datasets: [
                {
                  label: "Direct Sales",
                  data: [780, 850, 920, 1100],
                  backgroundColor: "#14b8a6"
                },
                {
                  label: "Programmatic",
                  data: [450, 520, 580, 650],
                  backgroundColor: "#0d9488"
                },
                {
                  label: "Sponsored Content",
                  data: [120, 140, 160, 180],
                  backgroundColor: "#2dd4bf"
                }
              ]
            }
          },
          chartSummary: "The new model revealed undervalued contributions from programmatic and sponsored content, increasing total revenue by 23% and revenue per visit by 18%. However, gaps in historical tagging made it harder to fully credit cross-device behaviors early on, requiring added QA and ongoing improvements.",
          whatWorked: [
            "Shapley model surfaced value missed by last-click attribution",
            "Email showed 37% more impact than originally measured",
            "Social revenue was 2.3x higher when properly attributed",
            "Health content categories had 340% higher ROI with refined targeting",
            "Cross-device tracking revealed 45% of conversions spanned multiple touchpoints"
          ],
          whatDidnt: [
            "Historical UTM inconsistencies created noise in early model runs",
            "Mobile-to-desktop handoffs were undercounted without ID stitching",
            "Direct sales was difficult to segment cleanly, requiring custom mapping logic",
            "Some mid-funnel channels lacked the granularity needed for optimal weighting"
          ]
        }
      ]
    },
    {
      id: "brand-perception",
      title: "\u{1F3AF} Brand Perceptions & Audience",
      icon: "target",
      description: "Brand health tracking and lift studies to measure campaign impact on awareness, consideration, and purchase intent",
      projects: [
        {
          id: "cpg-brand-lift",
          title: "CPG Brand - Multi-Channel Brand Lift Study",
          category: "brand-perception",
          client: "Consumer Packaged Goods Company",
          description: "Measure the impact of a multi-channel campaign on brand awareness, likeability, and intent",
          whyReason: "The strategy team needed a deeper read on how media was shifting brand perceptions - beyond direct response - to guide future creative and investment decisions.",
          howMethod: "Ran a randomized control/exposed study across 2.3M users using Kantar, Nielsen, and YouGov. Connected survey responses to campaign exposure across video, display, and social. Identified optimal frequency ranges to maximize lift across upper-funnel KPIs.",
          budget: "$890K",
          duration: "10 weeks",
          tools: ["Kantar", "Nielsen", "YouGov", "Tableau"],
          metrics: [
            { label: "Brand Awareness", value: "+12%", trend: "up" },
            { label: "Intent", value: "+8%", trend: "up" },
            { label: "Brand Likeability", value: "+15%", trend: "up" },
            { label: "Confidence Level", value: "95%", trend: "up" }
          ],
          chartData: {
            type: "scatter",
            data: {
              datasets: [
                {
                  label: "Awareness Lift",
                  data: [
                    { x: 2.1, y: 8 },
                    { x: 3.4, y: 15 },
                    { x: 4.8, y: 24 },
                    { x: 5.2, y: 31 },
                    { x: 6.7, y: 28 },
                    { x: 8.1, y: 26 }
                  ],
                  backgroundColor: "#14b8a6",
                  borderColor: "#14b8a6"
                },
                {
                  label: "Consideration Lift",
                  data: [
                    { x: 2.1, y: 12 },
                    { x: 3.4, y: 22 },
                    { x: 4.8, y: 35 },
                    { x: 5.2, y: 42 },
                    { x: 6.7, y: 38 },
                    { x: 8.1, y: 34 }
                  ],
                  backgroundColor: "#0d9488",
                  borderColor: "#0d9488"
                },
                {
                  label: "Cost Efficiency",
                  data: [
                    { x: 2.1, y: 45 },
                    { x: 3.4, y: 52 },
                    { x: 4.8, y: 68 },
                    { x: 5.2, y: 78 },
                    { x: 6.7, y: 65 },
                    { x: 8.1, y: 48 }
                  ],
                  backgroundColor: "#2dd4bf",
                  borderColor: "#2dd4bf"
                }
              ]
            }
          },
          chartSummary: "The campaign achieved significant brand lift with 12% awareness increase and 15% likeability improvement. Optimal frequency was identified at 5-6 exposures before diminishing returns. Video creative drove stronger intent lift, though cross-platform coordination required more precise frequency management to avoid oversaturation.",
          whatWorked: [
            "Video creative drove 2.4x higher intent lift compared to static ads",
            "Optimal frequency range (5-6 exposures) maximized brand impact efficiency",
            "Cross-platform exposure increased brand recall by 67% vs single-channel",
            "18-34 demographic showed strongest lift response (+43% awareness)"
          ],
          whatDidnt: [
            "Frequency beyond 6 exposures showed diminishing returns and budget waste",
            "Static creative formats underperformed across all brand metrics",
            "Cross-platform frequency coordination was challenging without unified measurement",
            "Upper demographics showed more resistance to brand messaging shifts"
          ]
        },
        {
          id: "entertainment-correlation",
          title: "Entertainment Brand - Correlation Analysis: Reach, Frequency & Brand Lift",
          category: "brand-perception",
          client: "Entertainment Platform",
          description: "Quantify the relationship between cross-channel media investment and shifts in brand health perceptions to inform global planning for an entertainment platform",
          whyReason: "Stakeholders wanted to validate that cross-platform media efforts were moving key brand health indicators \u2014 including trust, relevance, and likeability \u2014 and to determine which media mix and reach & frequency strategies were most effective across regional markets.",
          howMethod: "Executed a correlation analysis using brand lift metrics from a cross-media measurement partner, alongside spend and delivery data from GAM, social platform UIs, and internal dashboards. Built models to analyze the relationship between media exposure, frequency, and brand health indicators across linear, CTV, social, and digital. Regional-level regression models were used to isolate impact among national and conservative proxy audiences.",
          budget: "$25M+",
          duration: "Ongoing, multi-market",
          tools: ["Cross-media measurement partner", "GAM", "Social UIs", "Tableau", "Internal Dashboards"],
          metrics: [
            { label: "Optimal Frequency", value: "5-7 exposures", trend: "neutral" },
            { label: "Ad Awareness Lift", value: "26%", change: "OLV + CTV", trend: "up" },
            { label: "Brand Health Index", value: "+3.2%", change: "Conservative audiences", trend: "up" },
            { label: "Media Overlap Reduction", value: "18%", change: "Frequency cap modeling", trend: "up" }
          ],
          chartData: {
            type: "line",
            title: "Brand Health vs. Media Frequency Correlation",
            data: {
              labels: ["1-2 Exposures", "3-4 Exposures", "5-6 Exposures", "7-8 Exposures", "9-10 Exposures", "11+ Exposures"],
              datasets: [
                {
                  label: "Brand Health Index Change (%)",
                  data: [0.8, 2.1, 3.2, 2.8, 1.9, 1.2],
                  borderColor: "#14b8a6",
                  yAxisID: "y",
                  tension: 0.3
                },
                {
                  label: "Trust Metric (%)",
                  data: [1.2, 2.8, 4.1, 3.6, 2.4, 1.8],
                  borderColor: "#0d9488",
                  yAxisID: "y",
                  tension: 0.3
                },
                {
                  label: "Buzz Score",
                  data: [15, 28, 42, 38, 31, 24],
                  borderColor: "#2dd4bf",
                  yAxisID: "y1",
                  borderDash: [5, 5],
                  tension: 0.3
                }
              ]
            }
          },
          chartSummary: "The correlation analysis established strong relationships between cross-channel exposure and brand perception shifts across global markets. Linear + CTV combinations delivered the highest brand health lift, with optimal frequency at 6.2 exposures. However, regional measurement consistency required ongoing vendor alignment and standardization efforts.",
          whatWorked: [
            "Linear + CTV mix yielded the highest lift in brand health among conservative audiences",
            "Optimal frequency (6.2 exposures) consistently delivered peak brand impact",
            "Frequency capping reduced overlap and improved lift efficiency by 18%",
            "Regional correlation models revealed market-specific optimization opportunities"
          ],
          whatDidnt: [
            "Cross-platform measurement gaps initially limited correlation accuracy",
            "Vendor differences in brand health questions required standardization efforts",
            "Some regional markets lacked sufficient sample sizes for statistical significance",
            "Attribution delays made real-time optimization challenging during active campaigns"
          ]
        },
        {
          id: "audience-data-monetization",
          title: "Digital Media - Cross-Platform Audience Data Strategy",
          category: "brand-perception",
          client: "Multi-Platform Media Company",
          description: "Strengthen audience targeting and increase programmatic revenue by unifying audience data across media properties",
          whyReason: "The publisher needed to offer advertisers better targeting and premium inventory - but data was fragmented across platforms, limiting scale and yield.",
          howMethod: "Integrated audience data from DMPs and CDPs to build a unified taxonomy. Enabled cross-device identity resolution to increase match rates and addressable inventory. Connected data to ad servers and DSPs to activate high-value segments across programmatic channels.",
          budget: "$2.3M",
          duration: "12 months implementation",
          tools: ["Lotame", "Adobe Audience Manager", "GAM", "Cross-device Identity Resolution"],
          metrics: [
            { label: "Programmatic Revenue", value: "$18.2M", change: "+42%", trend: "up" },
            { label: "Audience Match Rate", value: "78%", change: "+31%", trend: "up" },
            { label: "Premium CPM Growth", value: "+67%", change: "+$3.40", trend: "up" },
            { label: "Advertiser Retention", value: "91%", change: "+15%", trend: "up" }
          ],
          chartData: {
            type: "bar",
            data: {
              labels: ["Behavioral Targeting", "Demographic Targeting", "Interest-Based", "Lookalike Audiences", "Custom Intent"],
              datasets: [
                {
                  label: "Audience Size (Millions)",
                  data: [42.3, 38.7, 35.2, 29.8, 22.4],
                  backgroundColor: "#14b8a6"
                },
                {
                  label: "Average CPM ($)",
                  data: [4.2, 5.8, 6.9, 8.5, 11.2],
                  backgroundColor: "#0d9488",
                  yAxisID: "y1"
                }
              ]
            }
          },
          chartSummary: "The unified audience data strategy increased programmatic revenue by 42% to $18.2M and improved match rates to 78%. Premium CPM growth of 67% was achieved through enhanced targeting capabilities. However, initial data integration complexities and privacy compliance required significant technical resources and ongoing maintenance.",
          whatWorked: [
            "Cross-device matching increased monetizable inventory across owned properties",
            "Custom intent segments delivered 2.7x higher CPMs despite smaller scale",
            "First-party data enrichment improved third-party segment performance by 45%",
            "Enhanced audience offerings drove 156% increase in private marketplace deals"
          ],
          whatDidnt: [
            "Data integration across platforms required more technical resources than initially planned",
            "Privacy compliance updates needed ongoing monitoring and system adjustments",
            "Some legacy data sources had inconsistent formatting, requiring extensive cleanup",
            "Cross-device identity resolution accuracy varied significantly by demographic segment"
          ]
        }
      ]
    },
    {
      id: "automation",
      title: "\u{1F916} Automation & Workflows",
      icon: "cpu",
      description: "Automated reporting systems and bid optimization workflows to improve operational efficiency and campaign performance",
      projects: [
        {
          id: "ecommerce-bidding",
          title: "E-commerce - Automated Bid Management",
          category: "automation",
          client: "Fashion E-commerce Retailer",
          description: "Scale campaign performance and reduce manual effort through automated bidding across Google and Facebook ads",
          whyReason: "Media team was spending 15+ hours per week manually adjusting bids across 2,000+ products, limiting agility and growth at scale.",
          howMethod: "Built machine learning-based bidding logic using Google Ads and Facebook APIs. Integrated profit margins, inventory levels, and historical performance into real-time decisioning. Automated reporting through BigQuery and Tableau to monitor ROAS, CPA, and revenue impact.",
          budget: "$2.1M managed",
          duration: "Ongoing system",
          tools: ["Google Ads API", "Facebook Marketing API", "BigQuery", "Tableau"],
          metrics: [
            { label: "ROAS", value: "4.6x", change: "+34%", trend: "up" },
            { label: "Cost per Action", value: "$20", change: "-23%", trend: "down" },
            { label: "Time Saved", value: "87%", trend: "up" },
            { label: "Revenue Growth", value: "+18%", trend: "up" }
          ],
          chartData: {
            type: "line",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Manual ROAS",
                  data: [3.2, 3.1, 3.4, 3.3, 3.5, 3.4],
                  borderColor: "#475569",
                  backgroundColor: "rgba(71, 85, 105, 0.1)"
                },
                {
                  label: "Automated ROAS",
                  data: [3.2, 3.6, 4.1, 4.3, 4.5, 4.6],
                  borderColor: "#14b8a6",
                  backgroundColor: "rgba(20, 184, 166, 0.1)"
                },
                {
                  label: "CPA ($)",
                  data: [28, 27, 24, 22, 21, 20],
                  borderColor: "#0d9488",
                  yAxisID: "y1"
                }
              ]
            }
          },
          chartSummary: "The automated bidding system improved ROAS to 4.6x and reduced CPA by 23% while eliminating 87% of manual optimization time. Machine learning outperformed manual bidding within 60 days. However, initial algorithm learning required careful monitoring and the system occasionally over-bid on seasonal products during inventory fluctuations.",
          whatWorked: [
            "Machine learning bids outperformed manual optimizations within 60 days",
            "Inventory-aware logic reduced wasted spend on out-of-stock products by 34%",
            "Profit margin integration shifted focus from CTR to true business value",
            "Always-on testing validated 15+ bidding strategies automatically"
          ],
          whatDidnt: [
            "Initial learning period required 3 weeks of close monitoring and manual overrides",
            "Seasonal inventory spikes occasionally triggered over-aggressive bidding",
            "Algorithm needed regular recalibration for new product categories",
            "Cross-platform bid coordination required custom logic due to API limitations"
          ]
        },
        {
          id: "saas-reporting",
          title: "Enterprise SaaS - Executive Reporting Automation",
          category: "automation",
          client: "Enterprise SaaS Company",
          description: "Automate weekly performance reporting to eliminate manual effort and improve decision-making speed across executive stakeholders supporting media & investment teams",
          whyReason: "Reporting across CRM, digital, CTV, paid media, and web analytics was time-consuming and error-prone \u2014 taking 16+ hours per week and delaying key insights needed for campaign pacing and budget reallocation.",
          howMethod: "Built a scalable reporting pipeline using Looker, Google Apps Script, and API integrations from CRM systems, digital & CTV platforms, and GA360. Developed dashboards tailored to leadership teams, including real-time visualizations of campaign health, pacing, and budget utilization across digital and streaming investments. Implemented anomaly detection and QA protocols to ensure accuracy and trust in delivery.",
          budget: "Internal project",
          duration: "3-month build + ongoing support",
          tools: ["Looker", "Salesforce", "DV360", "Google Analytics", "Google Apps Script"],
          metrics: [
            { label: "Report Generation Time", value: "15 min", change: "-94%", trend: "down" },
            { label: "Data Accuracy", value: "99.7%", change: "+12 pts", trend: "up" },
            { label: "Executive Satisfaction", value: "4.8/5", change: "+67%", trend: "up" },
            { label: "Stakeholder Adoption", value: "+215%", trend: "up" }
          ],
          chartData: {
            type: "bar",
            title: "Reporting Efficiency: Before vs After Automation",
            data: {
              labels: ["Manual Process", "Automated Process"],
              datasets: [
                {
                  label: "Time Required (Hours)",
                  data: [16, 0.25],
                  backgroundColor: "#ef4444"
                },
                {
                  label: "Data Accuracy (%)",
                  data: [87.7, 99.7],
                  backgroundColor: "#14b8a6"
                },
                {
                  label: "Stakeholder Reach",
                  data: [15, 47],
                  backgroundColor: "#0d9488"
                }
              ]
            }
          },
          chartSummary: "Automated reporting reduced generation time by 94% from 16 hours to 15 minutes while improving data accuracy to 99.7%. Executive satisfaction increased significantly with real-time campaign insights. However, initial adoption was slower in regional markets that preferred existing Excel workflows, requiring additional training and change management.",
          whatWorked: [
            "Real-time dashboards accelerated decision-making across media and investment teams",
            "Automated data validation flagged 23 anomalies per month, preventing errors",
            "Unified view revealed $340K in missed attribution opportunities",
            "Executive stakeholder adoption increased by 215% with improved reporting clarity"
          ],
          whatDidnt: [
            "Regional teams initially resisted adopting new dashboards over familiar Excel processes",
            "API rate limits occasionally delayed data refreshes during peak reporting periods",
            "Some data sources required custom transformations that weren't initially planned",
            "Change management took longer than expected, requiring additional training sessions"
          ]
        }
      ]
    },
    {
      id: "test-learn",
      title: "\u{1F9EA} Test & Learn",
      icon: "flask",
      description: "A/B testing frameworks and experimental design to drive data-driven decision making and performance optimization",
      projects: [
        {
          id: "retail-match-market",
          title: "Retail Chain - Match Market Testing Framework",
          category: "test-learn",
          client: "National Pet Retail Chain",
          description: "Develop a scalable match market testing framework to measure the impact of online media on in-store sales and establish a more complete ROAS picture for a national pet retail chain",
          whyReason: "The brand's in-store revenue was not being captured in existing digital media reporting, leading to an incomplete view of performance. Media & investment teams needed a way to attribute in-store sales to digital campaigns to validate budget decisions and better understand the offline impact of paid efforts.",
          howMethod: "Launched a geo-based match market test using The Trade Desk for media activation and LiveRamp to securely onboard in-store POS data. Markets were matched based on historical sales and media activity to isolate the incremental impact of digital. Custom segments were activated across display and online video, and weekly reporting was delivered via Looker Studio. Lift and ROAS were calculated using incremental in-store sales in test vs. control markets.",
          budget: "$2.5M",
          duration: "3-month test flight",
          tools: ["The Trade Desk", "LiveRamp", "Looker Studio", "Store-level POS Data"],
          metrics: [
            { label: "Incremental Store Sales", value: "+9.8%", change: "Test markets", trend: "up" },
            { label: "In-store ROAS", value: "3.1x", trend: "up" },
            { label: "Loyalty Member Overlap", value: "62%", trend: "neutral" },
            { label: "Cost Per Transaction", value: "$7.24", trend: "neutral" }
          ],
          chartData: {
            type: "bar",
            title: "Test vs Control Market Performance",
            data: {
              labels: ["Control Markets", "Test Markets - Display", "Test Markets - Video", "Test Markets - Combined"],
              datasets: [
                {
                  label: "Store Sales Lift (%)",
                  data: [0, 6.2, 8.4, 9.8],
                  backgroundColor: "#14b8a6"
                },
                {
                  label: "In-store ROAS",
                  data: [1, 2.1, 2.8, 3.1],
                  backgroundColor: "#0d9488",
                  yAxisID: "y1"
                }
              ]
            }
          },
          chartSummary: "Match market testing revealed a 9.8% incremental lift in store sales with 3.1x in-store ROAS, validating digital media's offline impact. Loyalty audience onboarding enabled accurate attribution, though mobile placements underperformed desktop and video. Market-level variations highlighted the need for ongoing test calibration and geographic considerations.",
          whatWorked: [
            "Loyalty audience onboarding enabled accurate offline attribution tracking",
            "Desktop and video placements generated strong incremental store sales lift",
            "Brand-focused messaging outperformed promotion-heavy creative variants",
            "Geographic match market methodology isolated true incremental impact"
          ],
          whatDidnt: [
            "Mobile display placements struggled to generate meaningful lift vs other formats",
            "Market-level anomalies required ongoing test calibration and adjustment",
            "Some geographic markets showed inconsistent performance patterns",
            "Attribution windows needed refinement to capture full customer journey impact"
          ]
        },
        {
          id: "fintech-onboarding",
          title: "FinTech Startup - User Onboarding Optimization",
          category: "test-learn",
          client: "Digital Banking Platform",
          description: "Improve user registration and activation rates by optimizing the onboarding experience",
          whyReason: "A 67% drop-off during sign-up was stalling user growth and revenue. The team needed a clear, test-and-learn approach to identify and eliminate friction.",
          howMethod: "Ran targeted A/B and multivariate tests across the registration flow. Measured impact on sign-ups, activations, and retention using Amplitude and Tableau. Created a live dashboard to monitor results and flag opportunities in real time.",
          budget: "$450K",
          duration: "5 months",
          tools: ["Amplitude", "Tableau", "A/B Testing Platform"],
          metrics: [
            { label: "Registration Rate", value: "78%", change: "+31%", trend: "up" },
            { label: "Activation Rate", value: "89%", change: "+22%", trend: "up" },
            { label: "30-Day Retention", value: "74%", change: "+19%", trend: "up" },
            { label: "Revenue Impact", value: "+$2.3M", trend: "up" }
          ],
          chartData: {
            type: "line",
            data: {
              labels: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
              datasets: [
                {
                  label: "Original Flow",
                  data: [100, 82, 65, 48, 33],
                  borderColor: "#475569",
                  tension: 0.1
                },
                {
                  label: "Optimized Flow",
                  data: [100, 91, 85, 78, 71],
                  borderColor: "#14b8a6",
                  tension: 0.1
                }
              ]
            }
          },
          chartSummary: "A/B testing optimized the registration flow, improving conversion from 33% to 71% and driving $2.3M in incremental revenue. Mobile-first design and simplified forms significantly boosted completions. However, gamified elements increased engagement but slightly reduced final conversion, requiring selective implementation.",
          whatWorked: [
            "Simplified form layout reduced cognitive load and boosted completion rates",
            "Trust signals and security badges significantly reduced user drop-off",
            "Mobile-first design outperformed desktop version by 45%",
            "Real-time validation prevented errors and improved user experience"
          ],
          whatDidnt: [
            "Gamified progress elements increased engagement but slightly lowered final conversion",
            "Too many form fields in early steps created abandonment points",
            "Complex password requirements initially frustrated users before simplification",
            "Social login options had lower completion rates than expected"
          ]
        }
      ]
    }
  ];
}

// server/routes.ts
function registerRoutes(app2) {
  storage.setCategories(generateMockData());
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });
  return app2;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use((req, res, next) => {
  if (app.get("env") !== "development" && req.header("x-forwarded-proto") !== "https") {
    return res.redirect(301, `https://${req.get("host")}${req.url}`);
  }
  next();
});
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  registerRoutes(app);
  const server = createServer(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  app.use("/assets", express2.static("public/assets"));
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
