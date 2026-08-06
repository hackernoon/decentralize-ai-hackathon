export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What is the Decentralize AI Hackathon?",
    answer:
      "A global developer competition organized by HackerNoon, Nosana, Arweave and MEXC. The goal is to build real, working contributions to open-source AI infrastructure, including decentralized GPU orchestration, permanent model storage, and verifiable AI systems. It runs across two rounds, with prizes awarded each round."
  },
  {
    question: "Who can participate?",
    answer:
      "Individual developers and early-stage startups are both welcome. If your project tackles any part of the decentralized AI stack, you are eligible."
  },
  {
    question: "How long does the hackathon run?",
    answer:
      "It runs across two rounds from June 2026 to February 2027, with winners announced at the end of each one. Submissions are open now at DecentralizeAI.tech."
  },
  {
    question: "What kinds of projects are eligible?",
    answer:
      "Any project that makes a genuine contribution to decentralized AI infrastructure. Specific areas include: decentralized GPU orchestration, permanent model storage using Arweave, verifiable and reproducible AI systems, open inference infrastructure, and data sovereignty tooling. Existing projects are welcome alongside new ones."
  },
  {
    question: "What kind of project qualify?",
    answer:
      "Four things: Technical depth (is this a real implementation?); Originality (does it solve something unsolved?); Impact (does it meaningfully advance the decentralized AI stack?); and Verifiable evidence, such as working code, a deployment URL, or reproducible metrics. Mockups, prototypes without demos, and coming-soon projects are not eligible."
  },
  {
    question: "How do I submit?",
    answer:
      "Submit your proposal at DecentralizeAI.tech. You will also need to publish your work on HackerNoon. Documenting your idea, architecture, and progress as you build is part of the process. Claim your free compute and storage credits once you are eligible, then submit your finished project for sponsor prizes each round."
  },
  {
    question: "Can I submit to multiple rounds?",
    answer:
      "Yes. Two rounds of winners are announced throughout the campaign, and you can submit your project for consideration in each one as your build progresses."
  },
  {
    question: "What is HackerNoon's role beyond organizing the event?",
    answer:
      "HackerNoon provides the publishing layer. The DecentralizeAI.tech platform, built on Llama 3, Mixtral, and Stable Diffusion, helps participants turn GitHub READMEs or rough notes into polished technical articles. It is how your build gets documented and shared with a global developer audience. The platform itself is also the grand prize."
  },
  {
    question: "What is Nosana and why does it matter?",
    answer:
      "Nosana is a decentralized GPU compute marketplace. It gives developers on-demand access to GPU infrastructure through a global network of providers, with no waitlists and no centralized cloud markups. Your compute credits give you real hardware to train, run inference, and deploy on."
  },
  {
    question: "What is Arweave and why does it matter?",
    answer:
      "Arweave is a decentralized permanent storage network. Once data is stored on Arweave, it is immutable and publicly accessible indefinitely. For AI systems, that means model weights, training datasets, and provenance records that cannot be taken down or altered."
  },
  {
    question: "What is MEXC and why does it matter?",
    answer:
      "MEXC provides both funding and potential market exposure for decentralized AI projects, and access to a large crypto ecosystem."
  },
  {
    question: "What is the total prize pool?",
    answer:
      "$51,750+ in total value, broken down as follows: $41,750 in Nosana compute credits for eligible participants ($70 each, up to 500 people); $2,500 in Arweave storage credits; $2,500 in AR cash prizes; and $5,000 in MEXC MX Token Rewards."
  },
  {
    question: "What is the grand prize?",
    answer:
      "HackerNoon is transferring full ownership of the DecentralizeAI.tech platform to the overall grand prize winner. That includes the domain and the full codebase, a publishing and writing tool built on open-source models including Llama 3, Mixtral, and Stable Diffusion."
  },
  {
    question: "Do all participants get compute credits, or only winners?",
    answer:
      "Both. Every eligible participant receives $70 in Nosana GPU compute credits. Winners receive an additional $450 in compute credits on top of that."
  },
  {
    question: "What are the Arweave credits for?",
    answer:
      "The $2,500 in Arweave storage credits are separate from the AR cash prize and go to winning or qualifying projects building on permanent, decentralized storage. They let you store AI datasets, model weights, and provenance records on the Arweave network."
  }
];
