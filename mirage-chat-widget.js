
/* =========================================================================
   MIRAGE AI — NEXT LEVEL OFFLINE CHATBOT
   Verification Suite · Medhavi Skills University · CoE

   -------------------------------------------------------------------------
   WHAT THIS VERSION DOES
   -------------------------------------------------------------------------
   ✓ Natural conversation
   ✓ Name recognition
   ✓ Conversation memory
   ✓ Context-aware follow-up questions
   ✓ Intent detection
   ✓ Synonym handling
   ✓ Typo tolerance
   ✓ Topic tracking
   ✓ Tool-aware conversations
   ✓ Dynamic suggestions
   ✓ Modern premium UI
   ✓ Copy response
   ✓ Clear chat
   ✓ Fully offline
   ✓ No API
   ✓ No external libraries
   ✓ No network requests

   INSTALL
   -------------------------------------------------------------------------
   <script src="mirage-chat-widget.js" defer></script>

   ========================================================================= */

(function () {

  "use strict";


  /* =======================================================================
     CONFIGURATION
     ======================================================================= */

  var CFG = {

    botName: "Mirage",

    subtitle: "Verification Suite Assistant",

    version: "3.0",

    colorFrom: "#4f46e5",

    colorTo: "#7c3aed",

    portalUrl: "index.html",

    tool1Url: "https://msu581.github.io/AllinONE/",

    tool2Url: "https://msu581.github.io/white-Vs-Original/",

    privacyNote:
      "Runs privately in your browser • No servers • No accounts",

    storageKey:
      "mirage_ai_memory_v3",

    maxHistory:
      12

  };


  /* =======================================================================
     PREVENT DOUBLE LOAD
     ======================================================================= */

  if (window.__mirageNextLevelLoaded) {

    return;

  }

  window.__mirageNextLevelLoaded = true;


  /* =======================================================================
     KNOWLEDGE BASE
     ======================================================================= */

  var KNOWLEDGE = [

    {
      id: "about",

      topic: "website",

      title: "About the Verification Suite",

      patterns: [
        "what is this website",
        "what is this site",
        "what is this portal",
        "what does this website do",
        "what does this site do",
        "what does this portal do",
        "what can this website do",
        "what can i do here",
        "tell me about this website",
        "tell me about this site",
        "tell me about this portal",
        "explain this website",
        "explain this site",
        "purpose of this website",
        "purpose of this site",
        "purpose of this portal",
        "why is this website",
        "what is verification suite",
        "about verification suite",
        "verification suite"
      ],

      keywords: [
        "website",
        "site",
        "portal",
        "verification",
        "suite",
        "purpose"
      ],

      answer:
        "The Verification Suite is an internal portal for the Controller of Examinations at Medhavi Skills University.\n\n" +

        "It brings together two main verification tools:\n\n" +

        "① Marksheet vs TR Verification\n" +
        "Compares issued gradesheet PDFs with the Tabulation Register (TR).\n\n" +

        "② White vs Original Verification\n" +
        "Checks white-background copies against sealed originals and provides additional checks such as SGPA & Percentage, Withheld Students, and Failed Candidates.\n\n" +

        "The tools run directly in the browser and generate Excel reports for verification.",

      link: {
        label: "Explore Verification Suite",
        url: "PORTAL#overview"
      },

      suggestions: [
        "What tools are available?",
        "How does Tool 1 work?",
        "How does Tool 2 work?"
      ]

    },


    {
      id: "tools",

      topic: "tools",

      title: "Available Tools",

      patterns: [
        "what tools are available",
        "which tools are available",
        "what tools do you have",
        "what tools does this website have",
        "what can i use",
        "list the tools",
        "show me the tools",
        "tell me the tools",
        "how many tools",
        "two tools",
        "available tools"
      ],

      keywords: [
        "tools",
        "available",
        "tool",
        "verification"
      ],

      answer:
        "There are two main verification tools in the suite:\n\n" +

        "① Marksheet vs TR Verification\n" +
        "Used to compare gradesheet PDFs against the Tabulation Register.\n\n" +

        "② White vs Original Verification\n" +
        "Used for White vs Original comparison and additional academic checks including SGPA & Percentage, Withheld Students, and Failed Candidates.\n\n" +

        "Both tools work independently.",

      link: {
        label: "View Tools",
        url: "PORTAL#tools"
      },

      suggestions: [
        "How do I use Tool 1?",
        "How do I use Tool 2?",
        "What is TR?"
      ]

    },


    {
      id: "tool1",

      topic: "tool1",

      title: "Marksheet vs TR Verification",

      patterns: [
        "what is tool 1",
        "what is tool one",
        "tell me about tool 1",
        "tell me about tool one",
        "marksheet vs tr",
        "marksheet verification",
        "gradesheet verification",
        "tr verification",
        "marksheet against tr",
        "compare marksheet with tr",
        "how does tool 1 work",
        "how does tool one work",
        "how do i use tool 1",
        "how do i use tool one",
        "how to use marksheet verification",
        "how to verify marksheet",
        "verify gradesheet",
        "all in one",
        "allinone"
      ],

      keywords: [
        "marksheet",
        "gradesheet",
        "tr",
        "verification",
        "tool",
        "compare"
      ],

      answer:
        "Tool 1 is the Marksheet vs TR Verification tool.\n\n" +

        "Its purpose is to compare the information in gradesheet PDFs with the Tabulation Register (TR).\n\n" +

        "Typical workflow:\n\n" +

        "1. Load the TR Excel file.\n" +
        "2. Add the gradesheet PDF files.\n" +
        "3. The tool detects the required format.\n" +
        "4. Registration Number is used to match records.\n" +
        "5. The gradesheet information is compared with the TR.\n" +
        "6. Review the verification results.\n" +
        "7. Download the Excel report.\n\n" +

        "The tool is designed for batch verification.",

      link: {
        label: "Open Marksheet vs TR",
        url: "TOOL1"
      },

      suggestions: [
        "What is TR?",
        "What happens if a PDF has an error?",
        "What format is the report?"
      ]

    },


    {
      id: "tool2",

      topic: "tool2",

      title: "White vs Original Verification",

      patterns: [
        "what is tool 2",
        "what is tool two",
        "tell me about tool 2",
        "tell me about tool two",
        "white vs original",
        "white original",
        "original verification",
        "white background verification",
        "sealed original",
        "how does tool 2 work",
        "how does tool two work",
        "how do i use tool 2",
        "how do i use tool two"
      ],

      keywords: [
        "white",
        "original",
        "verification",
        "sealed",
        "tool"
      ],

      answer:
        "Tool 2 is the White vs Original Verification toolkit.\n\n" +

        "It contains four main checks:\n\n" +

        "① White vs Original\n" +
        "Compares white-background copies against the sealed originals.\n\n" +

        "② SGPA & Percentage\n" +
        "Recalculates and verifies academic values from the gradesheet.\n\n" +

        "③ Withheld Students\n" +
        "Checks the TR for students marked with W in the Grace column.\n\n" +

        "④ Failed Candidates\n" +
        "Identifies failed students and can cross-check the PDF and TR lists.\n\n" +

        "Each check produces an Excel report.",

      link: {
        label: "Open White vs Original",
        url: "TOOL2"
      },

      suggestions: [
        "How is SGPA calculated?",
        "How are failed candidates checked?",
        "What does Withheld mean?"
      ]

    },


    {
      id: "tr",

      topic: "tr",

      title: "Tabulation Register",

      patterns: [
        "what is tr",
        "what does tr mean",
        "tr meaning",
        "meaning of tr",
        "what is tabulation register",
        "what is the tabulation register",
        "what is tabulated result",
        "what is the tabulated result",
        "explain tr",
        "tell me about tr"
      ],

      keywords: [
        "tr",
        "tabulation",
        "register",
        "result"
      ],

      answer:
        "TR refers to the Tabulation Register, also described as the tabulated result.\n\n" +

        "It contains the official student result information used as the reference when verifying gradesheet PDFs.\n\n" +

        "In the Marksheet vs TR tool, the Registration Number is used as the main matching key between the gradesheet and TR.",

      suggestions: [
        "How does Tool 1 use the TR?",
        "What if my PDF has an error?",
        "What format is the report?"
      ]

    },


    {
      id: "sgpa",

      topic: "sgpa",

      title: "SGPA and Percentage",

      patterns: [
        "what is sgpa",
        "what is percentage",
        "how is sgpa calculated",
        "how do you calculate sgpa",
        "how is percentage calculated",
        "how do you calculate percentage",
        "calculate sgpa",
        "calculate percentage",
        "recalculate sgpa",
        "recalculate percentage",
        "recompute sgpa",
        "sgpa calculation",
        "percentage calculation",
        "credit points",
        "how does sgpa work"
      ],

      keywords: [
        "sgpa",
        "percentage",
        "calculate",
        "recalculate",
        "credit",
        "points"
      ],

      answer:
        "The SGPA & Percentage check recalculates the academic values from the gradesheet data.\n\n" +

        "Percentage is calculated from total obtained marks and maximum marks.\n\n" +

        "SGPA is calculated using total credit points divided by total credits.\n\n" +

        "The calculated SGPA and Percentage are rounded to one decimal place before being compared with the printed values.\n\n" +

        "The tool also checks supporting values such as credit points and totals.",

      suggestions: [
        "What if the printed SGPA is wrong?",
        "What is a credit point?",
        "What does Tool 2 do?"
      ]

    },


    {
      id: "failed",

      topic: "failed",

      title: "Failed Candidates",

      patterns: [
        "failed candidates",
        "failed candidate",
        "failed students",
        "who failed",
        "find failed students",
        "how are failed students checked",
        "how does failed check work",
        "failure check",
        "fail check",
        "what counts as failed",
        "student failed",
        "candidate failed"
      ],

      keywords: [
        "failed",
        "fail",
        "failure",
        "candidate",
        "student"
      ],

      answer:
        "The Failed Candidates check identifies students whose academic records indicate a failed result.\n\n" +

        "The check can use gradesheet PDFs, the TR, or both sources.\n\n" +

        "When both sources are supplied, Mirage's verification tool can cross-check the two lists and identify differences between the PDF and TR results.",

      suggestions: [
        "What is Withheld?",
        "How does SGPA verification work?",
        "What is Tool 2?"
      ]

    },


    {
      id: "withheld",

      topic: "withheld",

      title: "Withheld Students",

      patterns: [
        "what is withheld",
        "what does withheld mean",
        "withheld students",
        "withheld student",
        "who is withheld",
        "how are withheld students checked",
        "how does withheld check work",
        "grace column",
        "w in grace",
        "w in the grace column"
      ],

      keywords: [
        "withheld",
        "grace",
        "w",
        "student"
      ],

      answer:
        "The Withheld Students check looks at the TR's Grace column.\n\n" +

        "A student is treated as WITHHELD when a subject's Grace cell contains the letter W.\n\n" +

        "A numeric grace value such as 4 or 2.5 is not treated as the W withheld indicator.",

      suggestions: [
        "How are failed students checked?",
        "What is TR?",
        "What does Tool 2 do?"
      ]

    },


    {
      id: "security",

      topic: "security",

      title: "Privacy and Security",

      patterns: [
        "is my data safe",
        "is this safe",
        "is my file safe",
        "what about privacy",
        "privacy",
        "security",
        "is it secure",
        "are my files uploaded",
        "does it upload my files",
        "does this upload files",
        "do files leave my computer",
        "does data leave my computer",
        "does it use a server",
        "does this use a server",
        "where does my data go"
      ],

      keywords: [
        "data",
        "safe",
        "privacy",
        "security",
        "files",
        "upload",
        "server"
      ],

      answer:
        "The verification tools are designed to process the uploaded PDFs and TR files directly in your browser.\n\n" +

        "The current widget itself makes no API calls and does not send your chat messages to an AI server.\n\n" +

        "For sensitive examination files, you should still follow your organization's document-handling and access-control policies.",

      link: {
        label: "Read the Portal Notice",
        url: "PORTAL#about"
      },

      suggestions: [
        "What does this website do?",
        "What tools are available?",
        "How does Tool 1 work?"
      ]

    },


    {
      id: "pdf-error",

      topic: "pdf",

      title: "PDF Errors",

      patterns: [
        "pdf error",
        "pdf is not working",
        "pdf not working",
        "pdf cannot be read",
        "pdf can't be read",
        "pdf cant be read",
        "file cannot be read",
        "file not reading",
        "scanned pdf",
        "no text layer",
        "pdf has no text",
        "corrupt pdf",
        "broken pdf",
        "failed to load pdf",
        "pdf failed"
      ],

      keywords: [
        "pdf",
        "error",
        "read",
        "scanned",
        "text",
        "file"
      ],

      answer:
        "If a PDF cannot be read, first check whether it contains a proper text layer.\n\n" +

        "A scanned image-only PDF may not contain extractable text, which can prevent the verification tool from reading the required fields.\n\n" +

        "Try testing that PDF individually and make sure you are using a valid text-based gradesheet export.",

      suggestions: [
        "What if the verification is slow?",
        "What format is the report?",
        "How does Tool 1 work?"
      ]

    },


    {
      id: "performance",

      topic: "performance",

      title: "Large Batch Performance",

      patterns: [
        "why is it slow",
        "why is it lagging",
        "verification is slow",
        "verification is lagging",
        "it is slow",
        "it is lagging",
        "large batch",
        "many pdfs",
        "many files",
        "too many files",
        "1000 pdf",
        "1000 pdfs",
        "browser is freezing",
        "page is freezing",
        "tool is stuck",
        "verification is stuck"
      ],

      keywords: [
        "slow",
        "lag",
        "large",
        "batch",
        "files",
        "pdf",
        "freeze",
        "stuck"
      ],

      answer:
        "Large batches require more browser processing because the PDFs are being handled locally.\n\n" +

        "For a smoother run:\n\n" +

        "• Avoid refreshing the page during verification.\n" +
        "• Keep the verification tab open.\n" +
        "• For very large batches, split the files into smaller groups.\n" +
        "• Allow the browser some time to finish processing.",

      suggestions: [
        "What if a PDF gives an error?",
        "How does Tool 1 work?",
        "What format is the report?"
      ]

    },


    {
      id: "report",

      topic: "report",

      title: "Excel Reports",

      patterns: [
        "what format is the report",
        "what report does it produce",
        "what file does it produce",
        "what output do i get",
        "what is the output",
        "excel report",
        "xlsx report",
        "download report",
        "report format",
        "where is the report",
        "verification report"
      ],

      keywords: [
        "report",
        "excel",
        "xlsx",
        "output",
        "download"
      ],

      answer:
        "The verification tools generate downloadable Excel (.xlsx) reports.\n\n" +

        "Marksheet vs TR Verification generates a verification workbook.\n\n" +

        "White vs Original Verification generates reports for its individual verification checks.",

      suggestions: [
        "How does Tool 1 work?",
        "How does Tool 2 work?",
        "What is TR?"
      ]

    },


    {
      id: "login",

      topic: "login",

      patterns: [
        "how do i login",
        "how do i log in",
        "how do i sign in",
        "how to login",
        "how to log in",
        "how to sign in",
        "login",
        "log in",
        "sign in",
        "signin",
        "staff id",
        "staff login",
        "password",
        "forgot password",
        "cannot login",
        "cant login",
        "login problem",
        "sign in problem"
      ],

      keywords: [
        "login",
        "signin",
        "password",
        "staff",
        "credentials"
      ],

      answer:
        "Use the Staff ID and password issued to your examination office team.\n\n" +

        "If you cannot sign in, verify that you are using the latest credentials provided to you.\n\n" +

        "The portal does not provide a self-service password reset.",

      suggestions: [
        "What does this website do?",
        "What tools are available?",
        "Is my data safe?"
      ]

    },


    {
      id: "workflow",

      topic: "workflow",

      patterns: [
        "how does this work",
        "how does the website work",
        "how does the portal work",
        "how does verification work",
        "what is the workflow",
        "what is the process",
        "what are the steps",
        "overall process",
        "overall workflow",
        "from login to report"
      ],

      keywords: [
        "workflow",
        "process",
        "steps",
        "verification",
        "report"
      ],

      answer:
        "The general workflow is simple:\n\n" +

        "1. Sign in to the Verification Suite.\n" +
        "2. Select the required verification tool.\n" +
        "3. Load the required PDFs or TR file.\n" +
        "4. Run the verification.\n" +
        "5. Review the findings.\n" +
        "6. Download the Excel report.\n\n" +

        "You can return to the portal whenever you need to use another verification tool.",

      link: {
        label: "See the Workflow",
        url: "PORTAL#workflow"
      },

      suggestions: [
        "What tools are available?",
        "How does Tool 1 work?",
        "How does Tool 2 work?"
      ]

    },

    {
      id: "darkmode",

      topic: "ui",

      patterns: [
        "dark mode",
        "dark theme",
        "light mode",
        "theme",
        "change theme",
        "switch theme",
        "night mode"
      ],

      keywords: [
        "dark",
        "light",
        "theme",
        "mode"
      ],

      answer:
        "Yes. The Verification Suite supports light and dark themes.\n\n" +

        "Use the theme control on the portal to switch between them. Your selected theme can be remembered on the device.",

      suggestions: [
        "What does this website do?",
        "What tools are available?"
      ]

    }

  ];


  /* =======================================================================
     NORMALIZATION
     ======================================================================= */

  function normalize(text) {

    return String(text || "")

      .toLowerCase()

      .replace(/[\u2018\u2019]/g, "'")

      .replace(/[\u201c\u201d]/g, '"')

      .replace(/[^\w\s']/g, " ")

      .replace(/\s+/g, " ")

      .trim();

  }


  /* =======================================================================
     WORDS
     ======================================================================= */

  var STOPWORDS = new Set([

    "a",
    "an",
    "the",
    "is",
    "are",
    "was",
    "were",
    "am",
    "be",
    "been",
    "being",

    "i",
    "me",
    "my",
    "mine",

    "you",
    "your",
    "yours",

    "we",
    "our",
    "ours",

    "they",
    "their",

    "this",
    "that",
    "these",
    "those",
    "it",
    "its",

    "and",
    "or",
    "but",
    "if",
    "then",
    "so",

    "to",
    "of",
    "in",
    "on",
    "at",
    "for",
    "from",
    "with",
    "without",
    "by",
    "as",

    "do",
    "does",
    "did",

    "can",
    "could",
    "would",
    "should",
    "will",
    "shall",
    "may",
    "might",
    "must",

    "what",
    "which",
    "who",
    "whom",
    "how",
    "why",
    "when",
    "where",

    "tell",
    "please",
    "just",
    "really",
    "very",
    "also",
    "about",

    "have",
    "has",
    "had",
    "get",
    "give",

    "here",
    "there",
    "now"

  ]);


  function meaningful(word) {

    return word &&
      word.length > 1 &&
      !STOPWORDS.has(word);

  }


  /* =======================================================================
     TYPO TOLERANCE
     ======================================================================= */

  function levenshtein(a, b) {

    if (a === b) return 0;

    if (!a.length) return b.length;

    if (!b.length) return a.length;


    var previous = [];

    var current = [];


    for (var j = 0; j <= b.length; j++) {

      previous[j] = j;

    }


    for (var i = 1; i <= a.length; i++) {

      current[0] = i;


      for (var j2 = 1; j2 <= b.length; j2++) {

        var cost =
          a.charAt(i - 1) === b.charAt(j2 - 1)
            ? 0
            : 1;


        current[j2] = Math.min(

          current[j2 - 1] + 1,

          previous[j2] + 1,

          previous[j2 - 1] + cost

        );

      }


      var temp = previous;

      previous = current;

      current = temp;

    }


    return previous[b.length];

  }


  function fuzzyWordMatch(a, b) {

    if (!a || !b) return false;

    if (a === b) return true;


    if (a.length <= 3 || b.length <= 3) {

      return false;

    }


    var distance =
      levenshtein(a, b);


    var maxLength =
      Math.max(a.length, b.length);


    return (
      distance <= 1 ||
      (
        maxLength >= 7 &&
        distance <= 2
      )
    );

  }


  /* =======================================================================
     SCORING
     ======================================================================= */

  function scoreKnowledge(text, item) {

    var input =
      normalize(text);


    if (!input) {

      return 0;

    }


    var score = 0;


    /*
      Exact complete question.
    */

    item.patterns.forEach(function (pattern) {

      var p =
        normalize(pattern);


      if (input === p) {

        score += 100;

      }

      else if (
        input.indexOf(p) !== -1
      ) {

        score +=
          20 +
          p.split(" ").length * 4;

      }

    });


    /*
      Word-level matching.
    */

    var inputWords =
      input
        .split(" ")
        .filter(meaningful);


    var keywordWords = [];


    item.keywords.forEach(function (keyword) {

      normalize(keyword)
        .split(" ")
        .filter(meaningful)
        .forEach(function (word) {

          keywordWords.push(word);

        });

    });


    inputWords.forEach(function (inputWord) {

      keywordWords.forEach(function (keywordWord) {

        if (
          inputWord === keywordWord
        ) {

          score += 5;

        }

        else if (
          fuzzyWordMatch(
            inputWord,
            keywordWord
          )
        ) {

          score += 2;

        }

      });

    });


    return score;

  }


  function findBestKnowledge(text) {

    var best = null;

    var bestScore = 0;

    var secondScore = 0;


    KNOWLEDGE.forEach(function (item) {

      var score =
        scoreKnowledge(
          text,
          item
        );


      if (score > bestScore) {

        secondScore = bestScore;

        bestScore = score;

        best = item;

      }

      else if (score > secondScore) {

        secondScore = score;

      }

    });


    return {

      item: best,

      score: bestScore,

      secondScore: secondScore

    };

  }


  /* =======================================================================
     MEMORY
     ======================================================================= */

  var memory = {

    name: null,

    lastTopic: null,

    lastIntent: null,

    lastTool: null,

    history: [],

    greeted: false

  };


  function loadMemory() {

    try {

      var saved =
        localStorage.getItem(
          CFG.storageKey
        );


      if (!saved) return;


      var data =
        JSON.parse(saved);


      if (!data) return;


      memory.name =
        data.name || null;

    }

    catch (e) {

      /* Ignore storage errors */

    }

  }


  function saveMemory() {

    try {

      localStorage.setItem(

        CFG.storageKey,

        JSON.stringify({

          name:
            memory.name

        })

      );

    }

    catch (e) {

      /* Ignore */

    }

  }


  function rememberMessage(
    role,
    text
  ) {

    memory.history.push({

      role: role,

      text: text,

      time: Date.now()

    });


    if (
      memory.history.length >
      CFG.maxHistory
    ) {

      memory.history.shift();

    }

  }


  loadMemory();


  /* =======================================================================
     NAME EXTRACTION
     ======================================================================= */

  function extractName(text) {

    var original =
      String(text || "")
        .trim();


    var t =
      normalize(original);


    var patterns = [

      /(?:my name is)\s+(.+)$/i,

      /(?:i am)\s+(.+)$/i,

      /(?:i'm)\s+(.+)$/i,

      /(?:im)\s+(.+)$/i,

      /(?:this is)\s+(.+)$/i,

      /(?:call me)\s+(.+)$/i,

      /(?:you can call me)\s+(.+)$/i,

      /(?:name is)\s+(.+)$/i

    ];


    for (
      var i = 0;
      i < patterns.length;
      i++
    ) {

      var match =
        original.match(
          patterns[i]
        );


      if (match) {

        var candidate =
          match[1]
            .replace(/[.!?,]+$/g, "")
            .trim();


        if (
          isReasonableName(
            candidate
          )
        ) {

          return formatName(
            candidate
          );

        }

      }

    }


    /*
      "Ayush here"
    */

    var hereMatch =
      original.match(
        /^([A-Za-z][A-Za-z'-]{1,20})\s+here$/i
      );


    if (hereMatch) {

      return formatName(
        hereMatch[1]
      );

    }


    return null;

  }


  function isReasonableName(name) {

    if (!name) return false;


    var words =
      name
        .trim()
        .split(/\s+/);


    if (
      words.length < 1 ||
      words.length > 3
    ) {

      return false;

    }


    var banned = [

      "hello",
      "hi",
      "hey",
      "good",
      "morning",
      "afternoon",
      "evening",
      "night",
      "help",
      "question",
      "website",
      "portal",
      "tool",
      "verification",
      "marksheet",
      "gradesheet"

    ];


    return words.every(
      function (word) {

        var clean =
          normalize(word);


        return (
          clean.length >= 2 &&
          !banned.includes(clean)
        );

      }
    );

  }


  function formatName(name) {

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .map(function (word) {

        return (
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
        );

      })
      .join(" ");

  }


  /* =======================================================================
     GREETINGS
     ======================================================================= */

  function getTimeGreeting() {

    var hour =
      new Date().getHours();


    if (hour < 12) {

      return "Good morning";

    }


    if (hour < 17) {

      return "Good afternoon";

    }


    if (hour < 21) {

      return "Good evening";

    }


    return "Hello";

  }


  function isGreeting(text) {

    var n =
      normalize(text);


    return /^(hi|hello|hey|hiya|hey there|hello there|good morning|good afternoon|good evening|good night)$/
      .test(n);

  }


  function isGreetingWithName(text) {

    return /^(hi|hello|hey|good morning|good afternoon|good evening|good night)\b/i
      .test(text) &&
      (
        /my name is/i.test(text) ||
        /i am/i.test(text) ||
        /i'm/i.test(text) ||
        /\bim\b/i.test(text) ||
        /call me/i.test(text)
      );

  }


  /* =======================================================================
     SIMPLE INTENTS
     ======================================================================= */

  function isThanks(text) {

    var n =
      normalize(text);


    return [

      "thanks",
      "thank you",
      "thankyou",
      "thanks a lot",
      "thank you so much",
      "great thanks",
      "ok thanks",
      "okay thanks"

    ].includes(n);

  }


  function isGoodbye(text) {

    var n =
      normalize(text);


    return [

      "bye",
      "goodbye",
      "good bye",
      "see you",
      "see you later",
      "talk later"

    ].includes(n);

  }


  function isAffirmative(text) {

    var n =
      normalize(text);


    return [

      "yes",
      "yeah",
      "yep",
      "yup",
      "sure",
      "okay",
      "ok",
      "yes please",
      "sure please"

    ].includes(n);

  }


  function isNegative(text) {

    var n =
      normalize(text);


    return [

      "no",
      "nah",
      "no thanks",
      "not now",
      "never mind",
      "nevermind"

    ].includes(n);

  }


  /* =======================================================================
     CONTEXT DETECTION
     ======================================================================= */

  function detectTool(text) {

    var n =
      normalize(text);


    if (
      /\btool\s*(1|one)\b/.test(n) ||
      n.includes("marksheet vs tr") ||
      n.includes("marksheet verification") ||
      n.includes("gradesheet verification") ||
      n.includes("allinone") ||
      n.includes("all in one")
    ) {

      return "tool1";

    }


    if (
      /\btool\s*(2|two)\b/.test(n) ||
      n.includes("white vs original") ||
      n.includes("white original") ||
      n.includes("sealed original")
    ) {

      return "tool2";

    }


    return null;

  }


  function detectTopic(text) {

    var tool =
      detectTool(text);


    if (tool) {

      return tool;

    }


    var match =
      findBestKnowledge(text);


    if (
      match.item &&
      match.score >= 8
    ) {

      return match.item.topic;

    }


    return null;

  }


  function hasFollowUpReference(text) {

    var n =
      normalize(text);


    return (

      /\bit\b/.test(n) ||

      /\bthat\b/.test(n) ||

      /\bthis\b/.test(n) ||

      /\bthe tool\b/.test(n) ||

      /\bthat tool\b/.test(n) ||

      /\bthis tool\b/.test(n) ||

      /\bit work\b/.test(n) ||

      /\bhow do i use it\b/.test(n) ||

      /\bhow does it work\b/.test(n)

    );

  }


  /* =======================================================================
     CONTEXTUAL ANSWERING
     ======================================================================= */

  function contextualAnswer(text) {

    var n =
      normalize(text);


    /*
      If the user says:
      "what about tool 1?"
    */

    var tool =
      detectTool(text);


    if (tool === "tool1") {

      var item1 =
        KNOWLEDGE.find(
          function (x) {
            return x.id === "tool1";
          }
        );


      return item1;

    }


    if (tool === "tool2") {

      var item2 =
        KNOWLEDGE.find(
          function (x) {
            return x.id === "tool2";
          }
        );


      return item2;

    }


    /*
      Follow-up "it / that / this tool"
      uses previous tool context.
    */

    if (
      hasFollowUpReference(text)
    ) {

      if (
        memory.lastTool === "tool1"
      ) {

        if (
          /\bhow\b/.test(n) ||
          /\buse\b/.test(n) ||
          /\bwork\b/.test(n) ||
          /\bdo\b/.test(n)
        ) {

          return KNOWLEDGE.find(
            function (x) {
              return x.id === "tool1";
            }
          );

        }

      }


      if (
        memory.lastTool === "tool2"
      ) {

        if (
          /\bhow\b/.test(n) ||
          /\buse\b/.test(n) ||
          /\bwork\b/.test(n) ||
          /\bdo\b/.test(n)
        ) {

          return KNOWLEDGE.find(
            function (x) {
              return x.id === "tool2";
            }
          );

        }

      }


      /*
        Previous topic.
      */

      if (memory.lastTopic) {

        var contextual =
          KNOWLEDGE.find(
            function (x) {

              return (
                x.topic ===
                memory.lastTopic
              );

            }
          );


        if (contextual) {

          return contextual;

        }

      }

    }


    return null;

  }


  /* =======================================================================
     DYNAMIC RESPONSE PERSONALIZATION
     ======================================================================= */

  function personalize(text) {

    if (!memory.name) {

      return text;

    }


    /*
      Only personalize short conversational responses.
    */

    return text;

  }


  function getFollowUpSuggestions(item) {

    if (
      item &&
      item.suggestions &&
      item.suggestions.length
    ) {

      return item.suggestions
        .slice(0, 3)
        .map(function (text) {

          return {

            label: text,

            value: text

          };

        });

    }


    return [

      {
        label: "What does this website do?",

        value: "What does this website do?"

      },

      {
        label: "What tools are available?",

        value: "What tools are available?"

      },

      {
        label: "How does Tool 1 work?",

        value: "How does Tool 1 work?"

      }

    ];

  }


  /* =======================================================================
     URL HANDLING
     ======================================================================= */

  function resolveUrl(url) {

    if (!url) {

      return "#";

    }


    if (
      url.indexOf("PORTAL") === 0
    ) {

      return (
        CFG.portalUrl +
        url.slice(6)
      );

    }


    if (
      url === "TOOL1"
    ) {

      return CFG.tool1Url;

    }


    if (
      url === "TOOL2"
    ) {

      return CFG.tool2Url;

    }


    return url;

  }


  function openLink(url) {

    var resolved =
      resolveUrl(url);


    if (
      resolved.charAt(0) === "#"
    ) {

      var element =
        document.querySelector(
          resolved
        );


      if (
        element &&
        element.scrollIntoView
      ) {

        element.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });


        return;

      }

    }


    window.open(
      resolved,
      "_blank",
      "noopener,noreferrer"
    );

  }


  /* =======================================================================
     CSS
     ======================================================================= */

  var css = `

    .mrg3-fab {

      position: fixed;

      right: 24px;

      bottom: 24px;

      width: 62px;

      height: 62px;

      border: 0;

      border-radius: 21px;

      cursor: pointer;

      z-index: 999999;

      display: flex;

      align-items: center;

      justify-content: center;

      background:
        linear-gradient(
          135deg,
          ${CFG.colorFrom},
          ${CFG.colorTo}
        );

      box-shadow:
        0 15px 40px
        rgba(79,70,229,.35);

      transition:
        transform .25s ease,
        box-shadow .25s ease;

    }


    .mrg3-fab:hover {

      transform:
        translateY(-4px)
        scale(1.04);

      box-shadow:
        0 20px 48px
        rgba(79,70,229,.45);

    }


    .mrg3-fab::before {

      content: "";

      position: absolute;

      inset: -6px;

      border-radius: 26px;

      border:
        1px solid
        rgba(124,58,237,.25);

      animation:
        mrg3Pulse 2.5s
        infinite;

    }


    @keyframes mrg3Pulse {

      0%,100% {

        opacity: .5;

        transform: scale(1);

      }

      50% {

        opacity: 0;

        transform: scale(1.1);

      }

    }


    .mrg3-fab svg {

      width: 28px;

      height: 28px;

      fill: white;

      position: relative;

      z-index: 2;

    }


    .mrg3-online {

      position: absolute;

      right: 4px;

      top: 4px;

      width: 12px;

      height: 12px;

      border-radius: 50%;

      background: #22c55e;

      border: 2px solid white;

      z-index: 3;

    }


    .mrg3-window {

      position: fixed;

      right: 24px;

      bottom: 100px;

      width: 405px;

      max-width:
        calc(100vw - 30px);

      height: 620px;

      max-height:
        calc(100vh - 125px);

      z-index: 999999;

      display: flex;

      flex-direction: column;

      overflow: hidden;

      border-radius: 27px;

      background:
        rgba(255,255,255,.94);

      border:
        1px solid
        rgba(255,255,255,.75);

      box-shadow:
        0 30px 90px
        rgba(15,23,42,.27);

      backdrop-filter:
        blur(22px);

      -webkit-backdrop-filter:
        blur(22px);

      opacity: 0;

      transform:
        translateY(20px)
        scale(.96);

      pointer-events: none;

      transition:
        opacity .25s ease,
        transform .25s ease;

      font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

    }


    .mrg3-window.open {

      opacity: 1;

      transform:
        translateY(0)
        scale(1);

      pointer-events: auto;

    }


    .mrg3-header {

      position: relative;

      display: flex;

      align-items: center;

      gap: 12px;

      padding: 17px 18px;

      color: white;

      background:
        linear-gradient(
          135deg,
          ${CFG.colorFrom},
          ${CFG.colorTo}
        );

      overflow: hidden;

    }


    .mrg3-header::after {

      content: "";

      position: absolute;

      width: 230px;

      height: 230px;

      right: -100px;

      top: -150px;

      border-radius: 50%;

      background:
        rgba(255,255,255,.12);

    }


    .mrg3-avatar {

      position: relative;

      z-index: 2;

      width: 43px;

      height: 43px;

      flex-shrink: 0;

      border-radius: 15px;

      display: flex;

      align-items: center;

      justify-content: center;

      font-size: 21px;

      background:
        rgba(255,255,255,.16);

      border:
        1px solid
        rgba(255,255,255,.25);

      box-shadow:
        inset 0 1px
        rgba(255,255,255,.15);

    }


    .mrg3-header-text {

      position: relative;

      z-index: 2;

      flex: 1;

      min-width: 0;

    }


    .mrg3-title {

      font-size: 15px;

      font-weight: 800;

      letter-spacing: .1px;

    }


    .mrg3-subtitle {

      font-size: 10.5px;

      opacity: .78;

      margin-top: 2px;

    }


    .mrg3-status {

      display: flex;

      align-items: center;

      gap: 5px;

      margin-top: 5px;

      font-size: 9.5px;

      opacity: .9;

    }


    .mrg3-status-dot {

      width: 6px;

      height: 6px;

      border-radius: 50%;

      background: #86efac;

      box-shadow:
        0 0 9px
        rgba(134,239,172,.9);

    }


    .mrg3-header-actions {

      position: relative;

      z-index: 3;

      display: flex;

      gap: 5px;

    }


    .mrg3-icon-btn {

      width: 31px;

      height: 31px;

      border-radius: 10px;

      border:
        1px solid
        rgba(255,255,255,.15);

      background:
        rgba(255,255,255,.1);

      color: white;

      cursor: pointer;

      display: flex;

      align-items: center;

      justify-content: center;

      transition:
        background .15s ease;

    }


    .mrg3-icon-btn:hover {

      background:
        rgba(255,255,255,.2);

    }


    .mrg3-privacy {

      padding: 7px 12px;

      text-align: center;

      font-size: 9.5px;

      color: #74798a;

      background: #fafbfe;

      border-bottom:
        1px solid
        #eceef4;

    }


    .mrg3-body {

      flex: 1;

      overflow-y: auto;

      padding: 18px;

      display: flex;

      flex-direction: column;

      gap: 12px;

      background:
        radial-gradient(
          circle at 50% 0%,
          rgba(99,102,241,.06),
          transparent 40%
        ),

        linear-gradient(
          180deg,
          #fafbff,
          #f5f6fa
        );

      scroll-behavior: smooth;

    }


    .mrg3-body::-webkit-scrollbar {

      width: 5px;

    }


    .mrg3-body::-webkit-scrollbar-thumb {

      background: #d8dbe5;

      border-radius: 20px;

    }


    .mrg3-row {

      display: flex;

      gap: 8px;

      animation:
        mrg3Message .25s ease;

    }


    @keyframes mrg3Message {

      from {

        opacity: 0;

        transform:
          translateY(7px);

      }

      to {

        opacity: 1;

        transform:
          translateY(0);

      }

    }


    .mrg3-row.user {

      justify-content: flex-end;

    }


    .mrg3-bubble {

      max-width: 86%;

      padding: 12px 14px;

      border-radius: 17px;

      font-size: 13px;

      line-height: 1.58;

      white-space: pre-wrap;

      word-break: break-word;

    }


    .mrg3-row.bot
    .mrg3-bubble {

      color: #252938;

      background:
        rgba(255,255,255,.92);

      border:
        1px solid
        #e5e7ef;

      border-top-left-radius: 5px;

      box-shadow:
        0 4px 14px
        rgba(15,23,42,.035);

    }


    .mrg3-row.user
    .mrg3-bubble {

      color: white;

      background:
        linear-gradient(
          135deg,
          ${CFG.colorFrom},
          ${CFG.colorTo}
        );

      border-top-right-radius: 5px;

      box-shadow:
        0 7px 20px
        rgba(79,70,229,.18);

    }


    .mrg3-bot-tools {

      display: flex;

      gap: 5px;

      margin-top: 8px;

    }


    .mrg3-mini {

      border: 0;

      background: transparent;

      color: #8a90a0;

      cursor: pointer;

      font-size: 10px;

      padding: 3px 5px;

      border-radius: 6px;

    }


    .mrg3-mini:hover {

      background: #f0f1f5;

      color: #4f46e5;

    }


    .mrg3-link {

      display: inline-flex;

      align-items: center;

      gap: 6px;

      margin-top: 10px;

      padding: 8px 12px;

      border-radius: 11px;

      background: #eef0ff;

      color: ${CFG.colorFrom};

      border:
        1px solid
        #dfe3ff;

      font-size: 11.5px;

      font-weight: 700;

      cursor: pointer;

    }


    .mrg3-link:hover {

      background: #e5e7ff;

    }


    .mrg3-chips {

      display: flex;

      flex-wrap: wrap;

      gap: 7px;

    }


    .mrg3-chip {

      border:
        1px solid
        #dfe2ea;

      background: white;

      color: #454a5a;

      border-radius: 12px;

      padding: 8px 11px;

      font-size: 11px;

      cursor: pointer;

      transition:
        transform .15s ease,
        background .15s ease,
        border-color .15s ease;

    }


    .mrg3-chip:hover {

      transform:
        translateY(-1px);

      background: #f7f7ff;

      border-color:
        #c9cdfd;

      color:
        ${CFG.colorFrom};

    }


    .mrg3-typing {

      width: max-content;

      display: flex;

      align-items: center;

      gap: 5px;

      padding: 11px 14px;

      border-radius: 17px;

      border-top-left-radius: 5px;

      background: white;

      border:
        1px solid
        #e5e7ef;

    }


    .mrg3-typing span {

      width: 6px;

      height: 6px;

      border-radius: 50%;

      background: #8d93a3;

      animation:
        mrg3Bounce 1.1s
        infinite ease-in-out;

    }


    .mrg3-typing span:nth-child(2) {

      animation-delay: .15s;

    }


    .mrg3-typing span:nth-child(3) {

      animation-delay: .3s;

    }


    @keyframes mrg3Bounce {

      0%,60%,100% {

        transform: translateY(0);

        opacity: .45;

      }

      30% {

        transform: translateY(-4px);

        opacity: 1;

      }

    }


    .mrg3-input-area {

      padding: 10px;

      background: white;

      border-top:
        1px solid
        #e9ebf1;

    }


    .mrg3-input-box {

      display: flex;

      align-items: center;

      gap: 7px;

      padding:
        4px 5px 4px 13px;

      background:
        #f5f6fa;

      border:
        1px solid
        #e1e4ec;

      border-radius: 17px;

      transition:
        border-color .15s ease,
        box-shadow .15s ease;

    }


    .mrg3-input-box:focus-within {

      border-color:
        #b9bdf6;

      box-shadow:
        0 0 0 3px
        rgba(79,70,229,.07);

    }


    .mrg3-input {

      flex: 1;

      min-width: 0;

      border: 0;

      outline: 0;

      background: transparent;

      color: #202433;

      font-size: 13px;

      padding: 9px 2px;

      font-family: inherit;

    }


    .mrg3-input::placeholder {

      color: #9ca1af;

    }


    .mrg3-send {

      width: 39px;

      height: 39px;

      flex-shrink: 0;

      border: 0;

      border-radius: 13px;

      cursor: pointer;

      display: flex;

      align-items: center;

      justify-content: center;

      background:
        linear-gradient(
          135deg,
          ${CFG.colorFrom},
          ${CFG.colorTo}
        );

      transition:
        transform .15s ease,
        opacity .15s ease;

    }


    .mrg3-send:hover {

      transform:
        translateY(-1px);

    }


    .mrg3-send:disabled {

      opacity: .4;

    }


    .mrg3-send svg {

      width: 16px;

      height: 16px;

      fill: white;

    }


    .mrg3-hint {

      text-align: center;

      font-size: 9px;

      color: #a0a4b1;

      margin-top: 6px;

    }


    @media(max-width:520px) {

      .mrg3-window {

        left: 10px;

        right: 10px;

        bottom: 82px;

        width: auto;

        height:
          calc(100vh - 105px);

        max-height: none;

        border-radius: 23px;

      }


      .mrg3-fab {

        right: 16px;

        bottom: 16px;

        width: 58px;

        height: 58px;

        border-radius: 18px;

      }

    }

  `;


  var style =
    document.createElement("style");


  style.setAttribute(
    "data-mirage-next-level",
    "true"
  );


  style.textContent =
    css;


  document.head.appendChild(
    style
  );


  /* =======================================================================
     DOM
     ======================================================================= */

  var fab =
    document.createElement("button");


  fab.className =
    "mrg3-fab";


  fab.setAttribute(
    "aria-label",
    "Open Mirage AI assistant"
  );


  fab.innerHTML = `

    <svg viewBox="0 0 24 24">

      <path d="
        M5 4h14
        a2 2 0 0 1 2 2v9
        a2 2 0 0 1-2 2H9
        l-4 3v-3H5
        a2 2 0 0 1-2-2V6
        a2 2 0 0 1 2-2z
      "/>

    </svg>

    <span class="mrg3-online"></span>

  `;


  var win =
    document.createElement("div");


  win.className =
    "mrg3-window";


  win.innerHTML = `

    <div class="mrg3-header">

      <div class="mrg3-avatar">
        ✦
      </div>

      <div class="mrg3-header-text">

        <div class="mrg3-title">
          ${CFG.botName}
        </div>

        <div class="mrg3-subtitle">
          ${CFG.subtitle}
        </div>

        <div class="mrg3-status">

          <span class="mrg3-status-dot"></span>

          Online · Ready to help

        </div>

      </div>

      <div class="mrg3-header-actions">

        <button
          class="mrg3-icon-btn"
          id="mrg3-clear"
          title="Clear conversation"
          type="button"
        >
          ↺
        </button>

        <button
          class="mrg3-icon-btn"
          id="mrg3-close"
          title="Close"
          type="button"
        >
          ×
        </button>

      </div>

    </div>


    <div class="mrg3-privacy">

      ${CFG.privacyNote}

    </div>


    <div
      class="mrg3-body"
      id="mrg3-body"
    ></div>


    <div class="mrg3-input-area">

      <div class="mrg3-input-box">

        <input
          class="mrg3-input"
          id="mrg3-input"
          type="text"
          autocomplete="off"
          placeholder="Ask Mirage anything…"
        />

        <button
          class="mrg3-send"
          id="mrg3-send"
          type="button"
          aria-label="Send message"
        >

          <svg viewBox="0 0 24 24">

            <path d="
              M3 20.5
              L21 12
              L3 3.5
              v6
              l11 2.5
              -11 2.5z
            "/>

          </svg>

        </button>

      </div>


      <div class="mrg3-hint">

        Enter to send · Your conversation stays in this browser

      </div>

    </div>

  `;


  document.body.appendChild(
    fab
  );


  document.body.appendChild(
    win
  );


  var bodyEl =
    win.querySelector(
      "#mrg3-body"
    );


  var inputEl =
    win.querySelector(
      "#mrg3-input"
    );


  var sendBtn =
    win.querySelector(
      "#mrg3-send"
    );


  var closeBtn =
    win.querySelector(
      "#mrg3-close"
    );


  var clearBtn =
    win.querySelector(
      "#mrg3-clear"
    );


  /* =======================================================================
     MESSAGE RENDERING
     ======================================================================= */

  function scrollBottom() {

    requestAnimationFrame(
      function () {

        bodyEl.scrollTop =
          bodyEl.scrollHeight;

      }
    );

  }


  function addUserMessage(text) {

    rememberMessage(
      "user",
      text
    );


    var row =
      document.createElement("div");


    row.className =
      "mrg3-row user";


    var bubble =
      document.createElement("div");


    bubble.className =
      "mrg3-bubble";


    bubble.textContent =
      text;


    row.appendChild(
      bubble
    );


    bodyEl.appendChild(
      row
    );


    scrollBottom();

  }


  function addBotMessage(
    text,
    linkObj,
    showTools
  ) {

    rememberMessage(
      "bot",
      text
    );


    var row =
      document.createElement("div");


    row.className =
      "mrg3-row bot";


    var bubble =
      document.createElement("div");


    bubble.className =
      "mrg3-bubble";


    bubble.textContent =
      personalize(text);


    if (
      linkObj &&
      linkObj.url
    ) {

      var link =
        document.createElement(
          "button"
        );


      link.className =
        "mrg3-link";


      link.type =
        "button";


      link.textContent =
        linkObj.label +
        "  ↗";


      link.addEventListener(
        "click",
        function () {

          openLink(
            linkObj.url
          );

        }
      );


      bubble.appendChild(
        document.createElement(
          "br"
        )
      );


      bubble.appendChild(
        link
      );

    }


    if (showTools !== false) {

      var tools =
        document.createElement(
          "div"
        );


      tools.className =
        "mrg3-bot-tools";


      var copy =
        document.createElement(
          "button"
        );


      copy.className =
        "mrg3-mini";


      copy.type =
        "button";


      copy.textContent =
        "Copy";


      copy.addEventListener(
        "click",
        function () {

          copyText(
            text
          );


          copy.textContent =
            "Copied ✓";


          setTimeout(
            function () {

              copy.textContent =
                "Copy";

            },
            1200
          );

        }
      );


      tools.appendChild(
        copy
      );


      bubble.appendChild(
        tools
      );

    }


    row.appendChild(
      bubble
    );


    bodyEl.appendChild(
      row
    );


    scrollBottom();

  }


  function copyText(text) {

    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {

      navigator.clipboard.writeText(
        text
      );

      return;

    }


    var textarea =
      document.createElement(
        "textarea"
      );


    textarea.value =
      text;


    textarea.style.position =
      "fixed";


    textarea.style.opacity =
      "0";


    document.body.appendChild(
      textarea
    );


    textarea.select();


    try {

      document.execCommand(
        "copy"
      );

    }

    catch (e) {}

    
    textarea.remove();

  }


  /* =======================================================================
     TYPING
     ======================================================================= */

  var typingRow =
    null;


  function showTyping() {

    hideTyping();


    typingRow =
      document.createElement(
        "div"
      );


    typingRow.className =
      "mrg3-row bot";


    typingRow.innerHTML = `

      <div class="mrg3-typing">

        <span></span>
        <span></span>
        <span></span>

      </div>

    `;


    bodyEl.appendChild(
      typingRow
    );


    scrollBottom();

  }


  function hideTyping() {

    if (
      typingRow
    ) {

      typingRow.remove();

      typingRow =
        null;

    }

  }


  function reply(
    text,
    link,
    suggestions
  ) {

    showTyping();


    var delay =
      Math.min(
        900,
        Math.max(
          380,
          280 +
          text.length * 1.2
        )
      );


    setTimeout(
      function () {

        hideTyping();


        addBotMessage(
          text,
          link
        );


        if (
          suggestions &&
          suggestions.length
        ) {

          setTimeout(
            function () {

              addSuggestions(
                suggestions
              );

            },
            80
          );

        }

      },
      delay
    );

  }


  function addSuggestions(
    suggestions
  ) {

    var wrap =
      document.createElement(
        "div"
      );


    wrap.className =
      "mrg3-chips";


    suggestions.forEach(
      function (option) {

        var button =
          document.createElement(
            "button"
          );


        button.className =
          "mrg3-chip";


        button.type =
          "button";


        button.textContent =
          option.label;


        button.addEventListener(
          "click",
          function () {

            wrap.remove();


            handleMessage(
              option.value
            );

          }
        );


        wrap.appendChild(
          button
        );

      }
    );


    bodyEl.appendChild(
      wrap
    );


    scrollBottom();

  }


  /* =======================================================================
     ANSWER LOGIC
     ======================================================================= */

  function answer(text) {

    /*
      1. Direct contextual answer.
    */

    var contextual =
      contextualAnswer(text);


    if (contextual) {

      return contextual;

    }


    /*
      2. Knowledge matching.
    */

    var match =
      findBestKnowledge(text);


    /*
      Strong match.
    */

    if (
      match.item &&
      match.score >= 8
    ) {

      return match.item;

    }


    /*
      Moderate match with clear lead.
    */

    if (
      match.item &&
      match.score >= 5 &&
      match.score >
        match.secondScore + 2
    ) {

      return match.item;

    }


    return null;

  }


  /* =======================================================================
     FALLBACK
     ======================================================================= */

  function fallback() {

    var namePart =
      memory.name
        ? ", " + memory.name
        : "";


    var text =
      "I'm not completely sure what you mean" +
      namePart +
      ". 🤔\n\n" +

      "I can help with the Verification Suite, including:\n\n" +

      "• What this website does\n" +
      "• Available verification tools\n" +
      "• Marksheet vs TR Verification\n" +
      "• White vs Original Verification\n" +
      "• SGPA & Percentage\n" +
      "• Failed Candidates\n" +
      "• Withheld Students\n" +
      "• TR information\n" +
      "• PDF errors\n" +
      "• Reports\n" +
      "• Privacy and security";


    reply(
      text,
      null,
      [

        {
          label:
            "What does this website do?",

          value:
            "What does this website do?"

        },

        {
          label:
            "What tools are available?",

          value:
            "What tools are available?"

        },

        {
          label:
            "How does Tool 1 work?",

          value:
            "How does Tool 1 work?"

        }

      ]

    );

  }


  /* =======================================================================
     MAIN MESSAGE HANDLER
     ======================================================================= */

  function handleMessage(
    rawText
  ) {

    var text =
      String(rawText || "")
        .trim();


    if (!text) {

      return;

    }


    addUserMessage(
      text
    );


    /*
      ---------------------------------------------------------------
      NAME + GREETING
      ---------------------------------------------------------------
    */

    var extractedName =
      extractName(text);


    if (
      extractedName
    ) {

      memory.name =
        extractedName;


      saveMemory();


      memory.lastTopic =
        null;


      var greeting =
        getTimeGreeting();


      reply(

        greeting +
        " " +
        extractedName +
        "! 👋\n\n" +

        "Nice to meet you. " +

        "What doubt do you have today?",

        null,

        [

          {
            label:
              "What does this website do?",

            value:
              "What does this website do?"

          },

          {
            label:
              "What tools are available?",

            value:
              "What tools are available?"

          },

          {
            label:
              "How does Tool 1 work?",

            value:
              "How does Tool 1 work?"

          }

        ]

      );


      return;

    }


    /*
      ---------------------------------------------------------------
      GREETING ONLY
      ---------------------------------------------------------------
    */

    if (
      isGreeting(text)
    ) {

      var greetingText =
        getTimeGreeting();


      if (
        memory.name
      ) {

        reply(

          greetingText +
          " " +
          memory.name +
          "! 👋\n\n" +

          "What doubt do you have today?",

          null,

          [

            {
              label:
                "What does this website do?",

              value:
                "What does this website do?"

            },

            {
              label:
                "What tools are available?",

              value:
                "What tools are available?"

            },

            {
              label:
                "How does Tool 1 work?",

              value:
                "How does Tool 1 work?"

            }

          ]

        );

      }

      else {

        reply(

          greetingText +
          "! 👋\n\n" +

          "I'm " +
          CFG.botName +
          ", your Verification Suite assistant.\n\n" +

          "You can tell me your name, or directly ask me something about the website.",

          null,

          [

            {
              label:
                "Tell me what this website does",

              value:
                "What does this website do?"

            },

            {
              label:
                "Show me the tools",

              value:
                "What tools are available?"

            }

          ]

        );

      }


      return;

    }


    /*
      ---------------------------------------------------------------
      THANKS
      ---------------------------------------------------------------
    */

    if (
      isThanks(text)
    ) {

      reply(

        memory.name
          ? "You're welcome, " +
            memory.name +
            "! 😊"
          : "You're welcome! 😊",

        null,

        [

          {
            label:
              "Ask another question",

            value:
              "What tools are available?"

          }

        ]

      );


      return;

    }


    /*
      ---------------------------------------------------------------
      GOODBYE
      ---------------------------------------------------------------
    */

    if (
      isGoodbye(text)
    ) {

      reply(

        memory.name
          ? "Goodbye, " +
            memory.name +
            "! 👋 Have a great day."
          : "Goodbye! 👋 Have a great day."

      );


      return;

    }


    /*
      ---------------------------------------------------------------
      NEGATIVE
      ---------------------------------------------------------------
    */

    if (
      isNegative(text)
    ) {

      reply(

        "No problem. 👍\n\n" +
        "Whenever you're ready, ask me anything about the Verification Suite."

      );


      return;

    }


    /*
      ---------------------------------------------------------------
      AFFIRMATIVE
      ---------------------------------------------------------------
    */

    if (
      isAffirmative(text) &&
      memory.lastTopic
    ) {

      var previous =
        KNOWLEDGE.find(
          function (item) {

            return (
              item.topic ===
              memory.lastTopic
            );

          }
        );


      if (previous) {

        reply(

          "Sure. Here's the relevant information:\n\n" +
          previous.answer,

          previous.link,

          getFollowUpSuggestions(
            previous
          )

        );


        return;

      }

    }


    /*
      ---------------------------------------------------------------
      NORMAL KNOWLEDGE ANSWER
      ---------------------------------------------------------------
    */

    var result =
      answer(text);


    if (
      result
    ) {

      memory.lastTopic =
        result.topic;


      memory.lastIntent =
        result.id;


      var tool =
        detectTool(text);


      if (tool) {

        memory.lastTool =
          tool;

      }

      else if (
        result.id === "tool1"
      ) {

        memory.lastTool =
          "tool1";

      }

      else if (
        result.id === "tool2"
      ) {

        memory.lastTool =
          "tool2";

      }


      reply(

        result.answer,

        result.link,

        getFollowUpSuggestions(
          result
        )

      );


      return;

    }


    /*
      ---------------------------------------------------------------
      FALLBACK
      ---------------------------------------------------------------
    */

    fallback();

  }


  /* =======================================================================
     CLEAR CONVERSATION
     ======================================================================= */

  function clearConversation() {

    memory.history = [];

    memory.lastTopic =
      null;

    memory.lastIntent =
      null;

    memory.lastTool =
      null;


    bodyEl.innerHTML = "";


    reply(

      memory.name
        ? "Conversation cleared. 👋\n\n" +
          "What would you like to know, " +
          memory.name +
          "?"
        : "Conversation cleared. 👋\n\nWhat would you like to know?",

      null,

      [

        {
          label:
            "What does this website do?",

          value:
            "What does this website do?"

        },

        {
          label:
            "What tools are available?",

          value:
            "What tools are available?"

        }

      ]

    );

  }


  /* =======================================================================
     OPEN / CLOSE
     ======================================================================= */

  var opened =
    false;


  function openChat() {

    win.classList.add(
      "open"
    );


    fab.style.display =
      "none";


    if (!opened) {

      opened =
        true;


      if (
        memory.name
      ) {

        reply(

          "Welcome back, " +
          memory.name +
          "! 👋\n\n" +

          "I'm " +
          CFG.botName +
          ", your Verification Suite assistant.\n\n" +

          "What would you like to know?",

          null,

          [

            {
              label:
                "What does this website do?",

              value:
                "What does this website do?"

            },

            {
              label:
                "What tools are available?",

              value:
                "What tools are available?"

            },

            {
              label:
                "How does Tool 1 work?",

              value:
                "How does Tool 1 work?"

            }

          ]

        );

      }

      else {

        reply(

          "Hello! 👋 I'm " +
          CFG.botName +
          ", your Verification Suite assistant.\n\n" +

          "Tell me your name or directly ask me a question.",

          null,

          [

            {
              label:
                "What does this website do?",

              value:
                "What does this website do?"

            },

            {
              label:
                "What tools are available?",

              value:
                "What tools are available?"

            }

          ]

        );

      }

    }


    setTimeout(
      function () {

        inputEl.focus();

      },
      200
    );

  }


  function closeChat() {

    win.classList.remove(
      "open"
    );


    fab.style.display =
      "flex";

  }


  /* =======================================================================
     EVENTS
     ======================================================================= */

  fab.addEventListener(
    "click",
    openChat
  );


  closeBtn.addEventListener(
    "click",
    closeChat
  );


  clearBtn.addEventListener(
    "click",
    clearConversation
  );


  sendBtn.addEventListener(
    "click",
    function () {

      var text =
        inputEl.value;


      inputEl.value =
        "";


      handleMessage(
        text
      );

    }
  );


  inputEl.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();


        var text =
          inputEl.value;


        inputEl.value =
          "";


        handleMessage(
          text
        );

      }

    }
  );


})();

