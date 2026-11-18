import type { Dictionary } from "./types";

/** Português europeu (pt-PT), segundo o Acordo Ortográfico de 1990. */
export const pt: Dictionary = {
  meta: {
    title: "Rachid Berrada — Programador web e soluções digitais",
    description:
      "Sites pensados para telemóvel, automatizações e aplicações web à medida para lojas, restaurantes e PME. Trabalhos verificáveis, método claro e contacto direto.",
    keywords: [
      "Rachid Berrada",
      "programador web",
      "site profissional",
      "menu digital",
      "código QR",
      "automatização",
      "aplicação web à medida",
    ],
  },

  person: {
    title: "Programador web e soluções digitais",
    valueProp:
      "Ajudo as empresas a desenvolver a sua presença digital e a automatizar as suas operações com soluções web adaptadas às suas necessidades.",
    portraitAlt: "Retrato de Rachid Berrada de fato claro",
    aboutPortraitAlt: "Rachid Berrada, retrato de perfil",
  },

  common: {
    skipToContent: "Ir para o conteúdo",
    whatsapp: "WhatsApp",
    call: "Ligar",
    email: "E-mail",
    saveContact: "Guardar contacto",
    share: "Partilhar",
    shareCopied: "Ligação copiada",
    shareFailed: "Não foi possível copiar: o endereço é rachidberrada.com",
    requestQuote: "Pedir orçamento",
    github: "GitHub",
    externalHint: "(abre num novo separador)",
  },

  nav: {
    ariaLabel: "Navegação principal",
    services: "Serviços",
    work: "Trabalhos",
    method: "Método",
    about: "Sobre mim",
    contact: "Contacto",
    openMenu: "Abrir o menu",
    closeMenu: "Fechar o menu",
    language: "Idioma",
    autoLanguage: "Automático",
    autoLanguageHint: "conforme o seu país",
  },

  whatsapp: {
    defaultMessage:
      "Olá Rachid, encontrei o seu site rachidberrada.com e gostaria de falar sobre um projeto.",
    cardMessage:
      "Olá Rachid, digitalizei o código QR do seu cartão de visita e gostaria de falar sobre um projeto.",
    quoteMessage: "Olá Rachid, gostaria de pedir um orçamento para um projeto.",
    floatingLabel: "Enviar mensagem a Rachid pelo WhatsApp",
  },

  hero: {
    viewWork: "Ver trabalhos",
    viewServices: "Serviços",
    secondaryAriaLabel: "Acessos rápidos",
  },

  card: {
    metaTitle: "Cartão de contacto",
    metaDescription:
      "Contactos de Rachid Berrada: WhatsApp, telefone, e-mail e ficha de contacto para guardar.",
    fullSite: "Ver o site completo",
  },

  services: {
    title: "O que faço pelas empresas",
    intro:
      "Quatro famílias de serviços, cada uma ligada a um problema concreto e, quando existe, a um trabalho que pode verificar.",
    audienceLabel: "Para quem",
    deliverableLabel: "O que recebe",
    includedLabel: "Pode incluir",
    proofLabel: "Exemplo:",
    cta: "Falar sobre esta necessidade",
    items: {
      presence: {
        title: "Presença digital",
        problem:
          "Os seus clientes procuram-no no telemóvel e não encontram nada claro: sem site, com informações dispersas, sem acesso fácil ao menu ou ao catálogo.",
        audience: "Lojas, restaurantes, ginásios, profissionais independentes e PME.",
        deliverable:
          "Um site profissional pensado primeiro para o telemóvel, onde ligar, enviar mensagem pelo WhatsApp ou encontrar a morada se faz com um toque.",
        included: [
          "Site institucional ou página de apresentação",
          "Menu digital ou catálogo de produtos",
          "Código QR do cartão de visita ligado ao site",
          "Publicação, alojamento e nome de domínio",
        ],
      },
      automation: {
        title: "Automatização",
        problem:
          "Os pedidos chegam por WhatsApp, e-mail e telefone, são copiados à mão para o Excel e alguns perdem-se pelo caminho.",
        audience:
          "Empresas que tratam pedidos, inscrições ou documentos de forma repetitiva.",
        deliverable:
          "Formulários e fluxos automatizados que centralizam os pedidos, avisam a pessoa certa e produzem os documentos necessários.",
        included: [
          "Formulários e recolha de pedidos",
          "Notificações por e-mail",
          "Sincronização com uma folha de cálculo ou base de dados",
          "Geração de documentos em PDF",
        ],
        note: "As minhas referências nesta área são protótipos técnicos: cada automatização começa por um piloto bem delimitado e testado.",
      },
      apps: {
        title: "Aplicações web à medida",
        problem:
          "A sua atividade assenta em folhas de Excel partilhadas, cadernos ou ferramentas genéricas que não acompanham a sua forma de trabalhar.",
        audience:
          "PME, condomínios, instituições de ensino e equipas que gerem dados do negócio.",
        deliverable:
          "Uma aplicação web adaptada: área de cliente ou de membro, painel de controlo, ferramenta interna ligada a uma base de dados.",
        included: [
          "Análise da necessidade e dos dados",
          "Contas de utilizador e acessos seguros",
          "Base de dados e painéis de controlo",
          "Implementação e documentação",
        ],
      },
      ai: {
        title: "IA e projetos-piloto",
        problem:
          "Ouve falar de IA, mas não sabe o que ela pode realmente fazer pela sua atividade, nem por onde começar.",
        audience: "Empresas que querem testar um caso de utilização concreto antes de investir.",
        deliverable:
          "Um piloto limitado e avaliável: assistente, pesquisa nos seus documentos ou integração de uma API de IA numa ferramenta existente.",
        included: [
          "Escolha de um caso de utilização realista",
          "Protótipo com dados fornecidos com o seu consentimento",
          "Integração de APIs de inteligência artificial",
          "Balanço claro: o que funciona e o que não funciona",
        ],
        note: "Oferta em fase piloto: a minha experiência em IA vem de projetos pessoais de I&D, ainda não de implementações em clientes.",
      },
    },
  },

  problems: {
    title: "Situações que resolvo",
    intro: "Problemas do dia a dia e a resposta mais simples que funciona.",
    items: [
      {
        situation: "«Estão sempre a perguntar-me o horário, os preços ou a morada.»",
        solution: "Uma página para telemóvel que responde a estas perguntas, ligada ao seu código QR e ao WhatsApp.",
        service: "presence",
      },
      {
        situation: "«O meu menu em papel é difícil de manter atualizado.»",
        solution: "Um menu digital aberto por código QR, atualizado sem reimprimir nada.",
        service: "presence",
      },
      {
        situation: "«Os pedidos dos clientes perdem-se entre o WhatsApp, as chamadas e os e-mails.»",
        solution: "Um único formulário que centraliza os pedidos e o avisa a cada envio.",
        service: "automation",
      },
      {
        situation: "«A minha equipa passa horas a copiar dados para o Excel.»",
        solution: "Uma ferramenta interna ou uma automatização que elimina a dupla introdução de dados.",
        service: "apps",
      },
      {
        situation: "«Gostava de usar IA, mas não sei se compensa.»",
        solution: "Um piloto curto sobre um caso concreto, para decidir com base em factos.",
        service: "ai",
      },
    ],
  },

  work: {
    title: "Trabalhos",
    intro:
      "Cada projeto indica o seu estado real: trabalho para cliente, demonstração, protótipo ou I&D pessoal. As imagens são capturas reais; sem captura, não há imagem.",
    viewCase: "Ler o estudo de caso",
    viewDemo: "Ver online",
    viewRepo: "Ver o código",
    roleLabel: "Função",
    stackLabel: "Tecnologias",
    status: {
      client: "Trabalho para cliente, online",
      demo: "Demonstração online",
      prototype: "Protótipo técnico",
      rd: "I&D pessoal",
    },
  },

  projects: {
    "gold-fitness": {
      title: "Gold Fitness",
      category: "Site para telemóvel com várias salas e código QR para um ginásio",
      tagline: "Um site para telemóvel, ligado aos cartões de visita do ginásio por código QR, que encaminha cada visitante para a sala certa.",
      summary: "Site pensado para telemóvel para o Gold Fitness (Martil e Chefchaouen): o visitante escolhe a cidade e o espaço (só para mulheres ou misto), consulta o horário e liga, envia mensagem pelo WhatsApp ou abre as direções com um toque.",
      context: "Trabalho para cliente: Gold Fitness, ginásios em Martil e Chefchaouen (Marrocos), apresentado com autorização do cliente. O site está online.",
      role: "Conceção, desenvolvimento, publicação, evoluções e redirecionamento do código QR.",
      problem: [
        "O ginásio precisava de um ponto de contacto digital simples, acessível diretamente a partir do cartão de visita impresso.",
        "Com duas cidades e espaços só para mulheres e mistos, o visitante tem de encontrar de imediato o ginásio certo, o horário e uma forma de contacto.",
      ],
      solution: [
        "Uma página única, pensada para telemóvel e alojada no GitHub Pages.",
        "Um seletor de ginásio (cidade e depois tipo de espaço) leva à ficha da sala: morada, horário e estado de abertura no momento.",
        "Uma barra de ações fixa no fundo do ecrã: ligar, WhatsApp, direções.",
        "Um segundo repositório serve apenas de redirecionamento técnico entre o código QR impresso e o site: o cartão nunca precisa de ser reimpresso quando o site muda.",
      ],
      features: [
        "Seletor de ginásio por cidade e tipo de espaço (só para mulheres ou misto)",
        "Ficha por sala: morada, horário, ligação para o Google Maps",
        "Estado de abertura calculado conforme a hora (aberto ou fechado)",
        "Barra de ações fixa: chamada, WhatsApp, direções",
        "Ligação para o Instagram e secção de vídeos",
      ],
      evidence: [
        "Site público online",
        "Código-fonte público no GitHub; evoluções recentes feitas por Rachid",
        "Capturas feitas no site online a 18 de novembro de 2026",
      ],
      limitations: [
        "Não existe medição de audiência: o número de visitas, digitalizações ou chamadas geradas é desconhecido, por isso nada é quantificado aqui.",
        "Algumas informações dependem do cliente e estão assinaladas «por confirmar» no site (horário e telefone de uma sala em Chefchaouen).",
        "Site estático: os conteúdos atualizam-se alterando o código.",
      ],
      flow: [
        "Cartão com código QR",
        "Redirecionamento",
        "Escolha do ginásio",
        "Chamada, WhatsApp ou direções",
      ],
      screenshotAlt: { mobile: "Página inicial do Gold Fitness no telemóvel com o seletor de ginásio", desktop: "Site do Gold Fitness num ecrã de computador" },
      metaDescription: "Estudo de caso: site para telemóvel do Gold Fitness (Martil, Chefchaouen), com várias salas, ligado aos cartões de visita por código QR.",
    },
    "menu-chez-bassou": {
      title: "Menu Chez Bassou",
      category: "Menu digital para um restaurante",
      tagline: "Um menu pensado para o telemóvel, com filtros, pesquisa e contacto pelo WhatsApp.",
      summary:
        "Demonstração de menu digital adaptável: filtros por categoria, pesquisa instantânea de pratos e pedidos ou perguntas enviados diretamente pelo WhatsApp.",
      context:
        "Demonstração feita para um conceito de restaurante («Chez Bassou — La Ferme de Loisirs»). Não é uma entrega confirmada a um cliente: alguns contactos apresentados são valores de exemplo.",
      role: "Conceção, desenvolvimento e publicação.",
      problem: [
        "Um menu de restaurante tem de abrir depressa no telemóvel, por exemplo a partir de um código QR na mesa, e continuar legível à medida que a carta cresce.",
      ],
      solution: [
        "Uma página estática em HTML, CSS e JavaScript nativos, sem framework, alojada no GitHub Pages.",
        "Uma barra de filtros fixa leva diretamente a cada categoria, e um campo de pesquisa filtra os pratos durante a escrita.",
        "Um botão de WhatsApp abre uma conversa pré-preenchida a partir do menu.",
      ],
      features: [
        "Filtros por categoria e pesquisa em tempo real",
        "Tabela de preços ao peso para os grelhados",
        "Botões para ligar e para contacto pelo WhatsApp",
        "Disposição adaptável a telemóvel, tablet e computador",
      ],
      evidence: ["Demonstração pública online", "Código-fonte público no GitHub"],
      limitations: [
        "Número de telefone e ligações de redes sociais de exemplo, a substituir para uso real.",
        "Pratos e preços escritos no código: não existe área de administração.",
      ],
      flow: ["Código QR na mesa", "Menu digital", "Filtro ou pesquisa", "Contacto pelo WhatsApp"],
      screenshotAlt: {
        mobile: "Menu Chez Bassou no telemóvel com os filtros de categorias",
        desktop: "Menu Chez Bassou num ecrã de computador",
      },
      metaDescription:
        "Estudo de caso: demonstração de menu digital adaptável com filtros, pesquisa e contacto pelo WhatsApp.",
    },
    "residence-mirador": {
      title: "Área de proprietários de condomínio",
      category: "Aplicação web de registo seguro",
      tagline: "Um percurso de registo seguro para os proprietários de um condomínio.",
      summary:
        "Protótipo que permite aos proprietários identificarem-se com um código de acesso e enviarem os seus contactos e disponibilidades para as reuniões de condomínio.",
      context:
        "Protótipo desenvolvido no contexto de um condomínio (Mirador Golf). A utilização em produção não está confirmada.",
      role: "Conceção e desenvolvimento da interface e do back-end em Supabase.",
      problem: [
        "O condomínio precisava de centralizar o registo dos proprietários: código de acesso único, contactos, disponibilidade para reuniões e assuntos a propor.",
      ],
      solution: [
        "Um percurso em várias etapas que verifica o código de acesso no servidor antes de qualquer introdução de dados.",
        "Os dados ficam guardados em PostgreSQL (Supabase) com segurança ao nível da linha, e são escritos apenas por funções de servidor que assinam os códigos de acesso em vez de os comparar em texto simples.",
      ],
      features: [
        "Verificação do código de acesso do proprietário",
        "Formulário de contactos, disponibilidades e assuntos propostos",
        "Consentimento explícito para a recolha de dados",
        "Nenhum acesso direto à base de dados a partir do navegador",
      ],
      evidence: ["Percurso de registo verificado no código-fonte", "Seis migrações SQL e duas funções de servidor"],
      limitations: [
        "A área de administração prevista ainda não foi desenvolvida.",
        "Código-fonte não publicado: descreve um sistema que pode tratar dados pessoais.",
        "De momento, não é apresentada nenhuma captura nem demonstração pública.",
      ],
      metaDescription:
        "Estudo de caso: protótipo de registo seguro para proprietários de um condomínio, com Supabase e verificação por código de acesso.",
    },
    "gestion-attestations": {
      title: "Gestão de certificados",
      category: "Aplicação full-stack com geração de documentos",
      tagline: "Uma aplicação para centralizar e emitir os certificados de uma instituição.",
      summary:
        "Gestão de estudantes, professores e estagiários com autenticação e geração de certificados em PDF, em contentores e com testes automáticos.",
      context: "Protótipo técnico full-stack. Não é utilizado em produção.",
      role: "Desenvolvimento full-stack: API Laravel, interface React, contentores Docker e integração contínua.",
      problem: [
        "Uma instituição gere vários perfis (estudantes, professores, estagiários) e tem de emitir certificados de forma fiável e rastreável.",
      ],
      solution: [
        "Uma API Laravel autenticada (Sanctum / JWT) que gera os documentos em PDF.",
        "Uma interface React (Vite, Chakra UI) para gerir os diferentes perfis.",
        "Um ambiente Docker e um pipeline GitHub Actions que executa os testes e constrói a imagem a cada envio.",
      ],
      features: [
        "Início de sessão e registo",
        "Gestão de estudantes, professores e estagiários",
        "Geração de certificados em PDF",
        "Testes e builds Docker automáticos",
      ],
      evidence: ["Código-fonte público no GitHub", "Pipeline de integração contínua no repositório"],
      limitations: [
        "Sem demonstração online.",
        "Documentação do repositório por concluir.",
        "Ainda sem capturas públicas.",
      ],
      metaDescription:
        "Estudo de caso: aplicação full-stack React e Laravel para gestão de certificados, com Docker e integração contínua.",
    },
    jarvis: {
      title: "JARVIS",
      category: "I&D em orquestração de inteligência artificial",
      tagline: "Um orquestrador de IA pessoal, multimodelo, com memória vetorial.",
      summary:
        "Projeto pessoal de investigação: orquestração de vários modelos de linguagem, memória de longo prazo e pipelines de voz e visão.",
      context: "Projeto pessoal de investigação e desenvolvimento, sem cliente. Não é um produto comercial.",
      role: "Conceção da arquitetura e desenvolvimento.",
      problem: [
        "Explorar, na prática, a orquestração de modelos de linguagem, a memória de longo prazo e as interfaces de voz e visão.",
      ],
      solution: [
        "Um orquestrador central (LangGraph) que encaminha cada pedido para o fornecedor de modelo adequado.",
        "Memória em dois níveis: armazenamento SQLite e base de dados vetorial Qdrant para pesquisa por semelhança (RAG).",
        "Pipelines de voz (palavra de ativação, transcrição, síntese) e de visão (captura de ecrã, OCR, análise de imagem) independentes do núcleo.",
      ],
      features: [
        "Orquestração multimodelo",
        "Memória persistente e vetorial com RAG",
        "Pipelines de voz e visão",
        "Controlo de permissões",
      ],
      evidence: ["Código-fonte público (versão V2, congelada)", "Documentos de arquitetura no repositório"],
      limitations: [
        "Protótipo de investigação, não utilizado em produção.",
        "Documentação parcialmente escrita.",
        "A versão seguinte é desenvolvida em privado e não é apresentada aqui.",
      ],
      metaDescription:
        "Estudo de caso: JARVIS, projeto pessoal de I&D em IA — orquestração multimodelo, memória vetorial e RAG.",
    },
  },

  method: {
    title: "Como trabalho",
    intro: "Quatro etapas, da primeira conversa à publicação.",
    steps: [
      {
        title: "Compreender a necessidade",
        body: "Uma conversa sobre a sua atividade, as suas restrições e o problema a resolver. Nenhuma solução é proposta antes de o problema estar compreendido.",
      },
      {
        title: "Definir a solução",
        body: "Uma proposta escrita: âmbito, funcionalidades, tecnologias e etapas. Sabe exatamente o que vai ser entregue.",
      },
      {
        title: "Conceber e desenvolver",
        body: "Desenvolvimento por etapas, com pontos de situação regulares sobre versões que pode experimentar.",
      },
      {
        title: "Testar e entregar",
        body: "Testes em telemóvel e computador, publicação e, por fim, entrega dos acessos e da documentação.",
      },
    ],
    supportNote:
      "O acompanhamento e a manutenção após a entrega são definidos em cada proposta, de acordo com as suas necessidades.",
  },

  about: {
    title: "Sobre mim",
    paragraphs: [
      "Chamo-me Rachid Berrada. Concebo e desenvolvo soluções web para empresas: sites, aplicações de gestão e automatizações.",
      "Parto sempre do terreno: perceber como a atividade funciona realmente, identificar o que faz perder tempo ou clientes e construir a ferramenta mais simples que resolve o problema.",
      "Os meus projetos vão do site para telemóvel ligado a um cartão de visita às aplicações full-stack com base de dados, contentores e integração contínua, passando pela I&D em inteligência artificial. Cada trabalho apresentado aqui indica o seu estado real.",
    ],
    githubCta: "Ver o meu código no GitHub",
  },

  contact: {
    title: "Vamos falar do seu projeto",
    intro:
      "O mais rápido é uma mensagem pelo WhatsApp. Também pode ligar, enviar um e-mail ou guardar os meus contactos no telemóvel.",
    quoteTitle: "Precisa de um orçamento?",
    quoteBody:
      "Descreva o seu projeto em dois minutos. Respondo com perguntas ou com uma primeira proposta.",
  },

  quote: {
    metaTitle: "Pedido de orçamento",
    metaDescription:
      "Descreva o seu projeto de site, automatização ou aplicação e Rachid Berrada entrará em contacto para o discutir.",
    title: "Pedir orçamento",
    intro: "Bastam algumas informações. Os campos assinalados com asterisco são obrigatórios.",
    directTitle: "Prefere falar diretamente?",
    directBody: "WhatsApp, telefone ou e-mail: escolha o canal que lhe for mais conveniente.",
    fields: {
      name: "Nome",
      company: "Empresa",
      email: "E-mail",
      phone: "Telefone ou WhatsApp",
      contactHint: "Indique pelo menos um e-mail ou um número de telefone.",
      service: "Tipo de necessidade",
      description: "O seu projeto",
      descriptionPlaceholder: "A sua atividade, o que quer melhorar, o que já existe…",
      timeline: "Prazo pretendido",
      contactPreference: "Como prefere ser contactado?",
      budget: "Orçamento previsto",
      budgetPlaceholder: "Um valor ou um intervalo, se já tiver",
      optional: "opcional",
      choose: "Escolher…",
      consent:
        "Aceito que estas informações sejam utilizadas para responder ao meu pedido, conforme descrito na",
      privacyLink: "política de privacidade",
      honeypot: "Não preencha este campo",
    },
    options: {
      service: {
        presence: "Presença digital (site, menu, código QR)",
        automation: "Automatização",
        apps: "Aplicação web à medida",
        ai: "IA ou projeto-piloto",
        other: "Outro, ou ainda não sei",
      },
      timeline: {
        asap: "O mais depressa possível",
        "1-3-months": "Dentro de 1 a 3 meses",
        "3-plus-months": "Daqui a mais de 3 meses",
        unsure: "Ainda não definido",
      },
      contactPreference: {
        whatsapp: "WhatsApp",
        phone: "Telefone",
        email: "E-mail",
      },
    },
    errors: {
      name: "Indique o seu nome.",
      contact: "Indique um e-mail ou um número de telefone.",
      email: "Este e-mail não parece válido (exemplo: nome@dominio.pt).",
      phone: "Este número de telefone não parece válido.",
      service: "Escolha um tipo de necessidade.",
      description: "Descreva o seu projeto em poucas palavras (pelo menos 10 caracteres).",
      consent: "O seu consentimento é necessário para tratar o pedido.",
      summary: "Há campos a corrigir.",
    },
    submit: "Enviar pedido",
    submitting: "A enviar…",
    successTitle: "Pedido enviado",
    successBody: "Obrigado. Rachid entrará em contacto pelo meio que escolheu.",
    failure:
      "O envio falhou e o seu pedido não foi transmitido. Tente novamente ou escreva diretamente a Rachid pelo WhatsApp ou por e-mail.",
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        question: "Quanto custa um projeto?",
        answer:
          "Depende do âmbito, da complexidade e do prazo. Após uma primeira conversa, recebe uma proposta escrita que detalha o conteúdo e o preço.",
      },
      {
        question: "Trabalha com pequenas empresas?",
        answer:
          "Sim. A solução é dimensionada à sua atividade: muitas vezes, uma boa página para telemóvel é suficiente para começar.",
      },
      {
        question: "Pode pegar num site ou numa ferramenta existente?",
        answer:
          "Sim, depois de analisar o que existe para decidir se é melhor melhorá-lo ou substituí-lo.",
      },
      {
        question: "O que acontece depois da entrega?",
        answer:
          "O acompanhamento e a manutenção são definidos na proposta, de acordo com as suas necessidades. Nada é imposto.",
      },
    ],
  },

  caseStudy: {
    back: "Todos os trabalhos",
    statusLabel: "Estado",
    contextLabel: "Contexto",
    roleLabel: "Função de Rachid",
    problemLabel: "O problema",
    solutionLabel: "A solução",
    featuresLabel: "Funcionalidades implementadas",
    flowLabel: "Percurso",
    evidenceLabel: "O que pode verificar",
    limitationsLabel: "Limitações e pontos não verificados",
    stackLabel: "Tecnologias",
    linksLabel: "Ligações",
    noLinks: "Sem ligação pública para este projeto.",
    screenshotsLabel: "Capturas",
    noScreenshots:
      "Não existe nenhuma captura pública deste projeto. Nenhuma imagem foi inventada para a substituir.",
    ctaTitle: "Uma necessidade semelhante?",
    ctaBody: "Explique a sua situação e vemos juntos o que é realista.",
    otherProjects: "Outros trabalhos",
  },

  footer: {
    rights: "Todos os direitos reservados.",
    legal: "Informação legal",
    privacy: "Privacidade",
    languages: "Idiomas",
  },

  legal: {
    notice: {
      title: "Informação legal",
      description: "Editor, alojamento e propriedade do site rachidberrada.com.",
      updated: "Atualizado a 18 de novembro de 2026",
      sections: [
        {
          heading: "Editor do site",
          body: [
            "O site rachidberrada.com é editado por Rachid Berrada, a título pessoal.",
            "Contacto: {email} — {phone}.",
            "Os dados de registo profissional serão acrescentados a esta página logo que estejam disponíveis.",
          ],
        },
        {
          heading: "Alojamento",
          body: ["O site está alojado pela Netlify, Inc. (Estados Unidos) — www.netlify.com."],
        },
        {
          heading: "Propriedade intelectual",
          body: [
            "Os textos, fotografias e elementos gráficos deste site pertencem a Rachid Berrada, salvo indicação em contrário. As capturas de projetos são reproduzidas para apresentar o trabalho realizado.",
            "É proibida qualquer reprodução sem autorização prévia.",
          ],
        },
        {
          heading: "Dados pessoais",
          body: ["O tratamento dos dados enviados através do site está descrito na política de privacidade."],
        },
      ],
    },
    privacy: {
      title: "Política de privacidade",
      description:
        "Que dados o site recolhe, para quê, durante quanto tempo e como exercer os seus direitos.",
      updated: "Atualizado a 18 de novembro de 2026",
      sections: [
        {
          heading: "Responsável pelo tratamento",
          body: ["Rachid Berrada, contactável através de {email}."],
        },
        {
          heading: "Dados recolhidos pelo formulário de orçamento",
          body: [
            "Nome, empresa (opcional), e-mail e/ou telefone, tipo de necessidade, descrição do projeto, prazo pretendido, meio de contacto preferido e orçamento (opcional).",
            "O formulário acrescenta também o idioma da página, a primeira página visitada e a origem da visita (por exemplo «cartão de visita», «pesquisa» ou «acesso direto»), para perceber como encontrou o site.",
          ],
        },
        {
          heading: "Finalidade e fundamento jurídico",
          body: [
            "Estes dados servem apenas para responder ao seu pedido e preparar uma eventual proposta. Não são vendidos nem utilizados para publicidade.",
            "O tratamento baseia-se no seu consentimento, dado ao assinalar a caixa do formulário, e nas diligências pré-contratuais.",
          ],
        },
        {
          heading: "Destinatários e alojamento",
          body: [
            "Os pedidos são recebidos através do serviço de formulários da Netlify (Estados Unidos). Quando uma automatização está ativa, uma cópia é enviada para a Make (plataforma de automatização), registada no Google Sheets e notificada pelo Gmail.",
            "Estes prestadores podem tratar os dados fora de Marrocos e da União Europeia, com as suas próprias garantias contratuais.",
          ],
        },
        {
          heading: "Prazo de conservação",
          body: [
            "Os pedidos são conservados no máximo três anos após o último contacto e depois eliminados, salvo se uma colaboração em curso exigir um prazo maior.",
          ],
        },
        {
          heading: "Escolha do idioma conforme o país",
          body: [
            "Ao abrir a página inicial, o fornecedor de alojamento determina o país a partir do endereço IP, no servidor, apenas para mostrar o idioma adequado.",
            "O site não guarda esse país nem o seu endereço IP. Não é pedida nenhuma localização precisa ao seu dispositivo. O fornecedor de alojamento pode tratar endereços IP nos seus registos técnicos, segundo a sua própria política.",
          ],
        },
        {
          heading: "Cookies e armazenamento local",
          body: [
            "Cookie «rb_locale»: criado apenas se escolher um idioma manualmente, para o memorizar durante doze meses. A opção «Automático» do seletor de idioma elimina-o.",
            "Armazenamento de sessão «rb_attribution»: memoriza a origem da visita durante a sessão e só é transmitido se enviar o formulário.",
            "Não existe, hoje, nenhum cookie publicitário nem ferramenta de medição de audiência ativa. Se for adicionada uma ferramenta de medição respeitadora da privacidade, esta página será atualizada antes da sua ativação.",
          ],
        },
        {
          heading: "Os seus direitos",
          body: [
            "Pode pedir o acesso, a retificação ou o apagamento dos seus dados e opor-se ao seu tratamento, escrevendo para {email}.",
            "Estes direitos aplicam-se, nomeadamente, ao abrigo da lei marroquina n.º 09-08 e, para pessoas na União Europeia, do Regulamento Geral sobre a Proteção de Dados (RGPD).",
            "Pode também apresentar reclamação à autoridade competente: a CNDP em Marrocos, a CNIL em França ou a CNPD em Portugal.",
          ],
        },
        {
          heading: "Serviços externos",
          body: [
            "As ligações para o WhatsApp, o GitHub ou os sites de projetos abrem serviços de terceiros sujeitos às suas próprias políticas de privacidade.",
          ],
        },
      ],
    },
  },
};
