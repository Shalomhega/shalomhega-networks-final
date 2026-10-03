import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { useLanguage } from "../lib/LanguageContext.jsx";

const testimonialsTranslations = {
  en: {
    label: "CLIENT TESTIMONIALS",
    title: "Hear From The Communities We Have Built With",
    description:
      "Real experiences from creators and community owners who trusted SHALOMHEGA NETWORKS with their Discord community systems.",
    experience: "Real Client Experiences",
    experienceText:
      "See how the systems, structure, and community experience come together through the people we have worked with.",
    watch: "Watch Testimonial",
    viewCommunity: "View Community",
    written: "What They Said",
    noTestimonials:
      "Client testimonials will appear here as they are added.",
    loading: "Loading testimonials...",
    unavailable:
      "Testimonials are currently unavailable. Please check back soon.",
    startLabel: "READY TO BUILD YOUR COMMUNITY?",
    startTitle: "Let’s Build Something Your Community Can Feel",
    startText:
      "Tell us where your community is today and what you want it to become.",
    startButton: "Start Your Project",
    close: "Close",
  },

  es: {
    label: "TESTIMONIOS DE CLIENTES",
    title: "Escucha a las Comunidades Que Hemos Ayudado a Construir",
    description:
      "Experiencias reales de creadores y propietarios de comunidades que confiaron en SHALOMHEGA NETWORKS.",
    experience: "Experiencias Reales de Clientes",
    experienceText:
      "Descubre cómo los sistemas, la estructura y la experiencia de comunidad se unen a través de las personas con las que hemos trabajado.",
    watch: "Ver Testimonio",
    viewCommunity: "Ver Comunidad",
    written: "Lo Que Dijeron",
    noTestimonials:
      "Los testimonios de clientes aparecerán aquí cuando se agreguen.",
    loading: "Cargando testimonios...",
    unavailable:
      "Los testimonios no están disponibles actualmente. Vuelve a consultar pronto.",
    startLabel: "¿LISTO PARA CONSTRUIR TU COMUNIDAD?",
    startTitle: "Construyamos Algo Que Tu Comunidad Pueda Sentir",
    startText:
      "Cuéntanos dónde está tu comunidad hoy y en qué quieres convertirla.",
    startButton: "Inicia Tu Proyecto",
    close: "Cerrar",
  },

  fr: {
    label: "TÉMOIGNAGES CLIENTS",
    title: "Écoutez les Communautés Que Nous Avons Aidé à Construire",
    description:
      "Des expériences réelles de créateurs et propriétaires de communautés qui ont fait confiance à SHALOMHEGA NETWORKS.",
    experience: "Expériences Réelles de Clients",
    experienceText:
      "Découvrez comment les systèmes, la structure et l'expérience communautaire prennent vie à travers nos clients.",
    watch: "Voir le Témoignage",
    viewCommunity: "Voir la Communauté",
    written: "Ce Qu'ils Ont Dit",
    noTestimonials:
      "Les témoignages clients apparaîtront ici lorsqu'ils seront ajoutés.",
    loading: "Chargement des témoignages...",
    unavailable:
      "Les témoignages sont actuellement indisponibles. Revenez bientôt.",
    startLabel: "PRÊT À CONSTRUIRE VOTRE COMMUNAUTÉ ?",
    startTitle: "Construisons Quelque Chose Que Votre Communauté Peut Ressentir",
    startText:
      "Dites-nous où se trouve votre communauté aujourd'hui et ce que vous souhaitez construire.",
    startButton: "Démarrer Votre Projet",
    close: "Fermer",
  },

  de: {
    label: "KUNDENSTIMMEN",
    title: "Erfahrungen Aus Den Communities, Die Wir Mitgestaltet Haben",
    description:
      "Echte Erfahrungen von Creatorn und Community Besitzern, die SHALOMHEGA NETWORKS vertraut haben.",
    experience: "Echte Kundenerfahrungen",
    experienceText:
      "Erlebe, wie Systeme, Struktur und Community Erlebnis durch die Menschen zusammenkommen, mit denen wir gearbeitet haben.",
    watch: "Testimonial Ansehen",
    viewCommunity: "Community Ansehen",
    written: "Was Sie Gesagt Haben",
    noTestimonials:
      "Kundenstimmen werden hier angezeigt, sobald sie hinzugefügt wurden.",
    loading: "Kundenstimmen werden geladen...",
    unavailable:
      "Kundenstimmen sind derzeit nicht verfügbar. Bitte später erneut versuchen.",
    startLabel: "BEREIT, DEINE COMMUNITY ZU BAUEN?",
    startTitle: "Lass Uns Etwas Bauen, Das Deine Community Spüren Kann",
    startText:
      "Erzähl uns, wo deine Community heute steht und was daraus werden soll.",
    startButton: "Projekt Starten",
    close: "Schließen",
  },

  pt: {
    label: "DEPOIMENTOS DE CLIENTES",
    title: "Ouça as Comunidades Que Ajudamos a Construir",
    description:
      "Experiências reais de criadores e proprietários de comunidades que confiaram na SHALOMHEGA NETWORKS.",
    experience: "Experiências Reais de Clientes",
    experienceText:
      "Veja como os sistemas, a estrutura e a experiência da comunidade se unem através das pessoas com quem trabalhamos.",
    watch: "Assistir ao Depoimento",
    viewCommunity: "Ver Comunidade",
    written: "O Que Disseram",
    noTestimonials:
      "Os depoimentos dos clientes aparecerão aqui quando forem adicionados.",
    loading: "Carregando depoimentos...",
    unavailable:
      "Os depoimentos estão indisponíveis no momento. Volte em breve.",
    startLabel: "PRONTO PARA CONSTRUIR SUA COMUNIDADE?",
    startTitle: "Vamos Construir Algo Que Sua Comunidade Possa Sentir",
    startText:
      "Conte onde sua comunidade está hoje e no que você quer transformá-la.",
    startButton: "Inicie Seu Projeto",
    close: "Fechar",
  },

  it: {
    label: "TESTIMONIANZE DEI CLIENTI",
    title: "Ascolta le Community Che Abbiamo Aiutato a Costruire",
    description:
      "Esperienze reali di creator e proprietari di community che hanno scelto SHALOMHEGA NETWORKS.",
    experience: "Esperienze Reali dei Clienti",
    experienceText:
      "Scopri come sistemi, struttura ed esperienza della community prendono forma attraverso le persone con cui abbiamo lavorato.",
    watch: "Guarda la Testimonianza",
    viewCommunity: "Vedi la Community",
    written: "Cosa Hanno Detto",
    noTestimonials:
      "Le testimonianze dei clienti appariranno qui quando verranno aggiunte.",
    loading: "Caricamento testimonianze...",
    unavailable:
      "Le testimonianze non sono attualmente disponibili. Torna presto.",
    startLabel: "PRONTO A COSTRUIRE LA TUA COMMUNITY?",
    startTitle: "Costruiamo Qualcosa Che La Tua Community Possa Sentire",
    startText:
      "Raccontaci dove si trova oggi la tua community e cosa vuoi che diventi.",
    startButton: "Inizia il Tuo Progetto",
    close: "Chiudi",
  },

  ar: {
    label: "شهادات العملاء",
    title: "استمع إلى تجارب المجتمعات التي ساهمنا في بنائها",
    description:
      "تجارب حقيقية من منشئي المجتمعات وأصحابها الذين وثقوا في SHALOMHEGA NETWORKS.",
    experience: "تجارب حقيقية من العملاء",
    experienceText:
      "شاهد كيف تجتمع الأنظمة والتنظيم وتجربة المجتمع من خلال الأشخاص الذين عملنا معهم.",
    watch: "شاهد الشهادة",
    viewCommunity: "عرض المجتمع",
    written: "ماذا قالوا",
    noTestimonials:
      "ستظهر شهادات العملاء هنا عند إضافتها.",
    loading: "جار تحميل الشهادات...",
    unavailable:
      "الشهادات غير متاحة حاليًا. يرجى العودة لاحقًا.",
    startLabel: "هل أنت مستعد لبناء مجتمعك؟",
    startTitle: "لنَبْنِ شيئًا يمكن لمجتمعك أن يشعر به",
    startText:
      "أخبرنا أين يوجد مجتمعك اليوم وما الذي تريد أن يصبح عليه.",
    startButton: "ابدأ مشروعك",
    close: "إغلاق",
  },

  zh: {
    label: "客户见证",
    title: "听听我们一起打造社区的客户怎么说",
    description:
      "来自创作者和社区负责人的真实体验，他们选择了 SHALOMHEGA NETWORKS。",
    experience: "真实客户体验",
    experienceText:
      "看看系统、结构和社区体验如何通过我们合作过的客户真正落地。",
    watch: "观看客户见证",
    viewCommunity: "查看社区",
    written: "他们怎么说",
    noTestimonials: "客户见证将在添加后显示在这里。",
    loading: "正在加载客户见证...",
    unavailable: "客户见证暂时无法使用，请稍后再试。",
    startLabel: "准备好打造你的社区了吗？",
    startTitle: "打造一个让社区真正感受到的空间",
    startText: "告诉我们你的社区现在在哪里，以及你希望它发展成什么样。",
    startButton: "开始您的项目",
    close: "关闭",
  },

  ja: {
    label: "お客様の声",
    title: "私たちと一緒にコミュニティを作ったお客様の声",
    description:
      "SHALOMHEGA NETWORKSを信頼してくださったクリエイターやコミュニティ運営者のリアルな体験をご紹介します。",
    experience: "リアルなお客様の体験",
    experienceText:
      "私たちが関わったコミュニティを通して、システム、構成、体験がどのように形になったかをご覧ください。",
    watch: "お客様の声を見る",
    viewCommunity: "コミュニティを見る",
    written: "お客様の言葉",
    noTestimonials:
      "お客様の声は追加されるとここに表示されます。",
    loading: "お客様の声を読み込んでいます...",
    unavailable:
      "現在、お客様の声を利用できません。後ほどもう一度お試しください。",
    startLabel: "コミュニティを作る準備はできましたか？",
    startTitle: "コミュニティが実感できるものを一緒に作りましょう",
    startText:
      "現在のコミュニティの状況と、どのようにしたいかを教えてください。",
    startButton: "プロジェクトを始める",
    close: "閉じる",
  },

  ko: {
    label: "고객 후기",
    title: "우리가 함께 만든 커뮤니티의 이야기를 들어보세요",
    description:
      "SHALOMHEGA NETWORKS를 믿고 함께 작업한 크리에이터와 커뮤니티 운영자들의 실제 경험입니다.",
    experience: "실제 고객 경험",
    experienceText:
      "우리가 함께한 고객들의 경험을 통해 시스템, 구조, 커뮤니티 경험이 어떻게 만들어졌는지 확인해보세요.",
    watch: "후기 영상 보기",
    viewCommunity: "커뮤니티 보기",
    written: "고객의 이야기",
    noTestimonials:
      "고객 후기는 추가되는 즉시 여기에 표시됩니다.",
    loading: "고객 후기를 불러오는 중...",
    unavailable:
      "현재 고객 후기를 사용할 수 없습니다. 잠시 후 다시 확인해주세요.",
    startLabel: "커뮤니티를 만들 준비가 되셨나요?",
    startTitle: "커뮤니티가 직접 느낄 수 있는 것을 만들어보세요",
    startText:
      "현재 커뮤니티의 상황과 앞으로 만들고 싶은 모습을 알려주세요.",
    startButton: "프로젝트 시작",
    close: "닫기",
  },
};

function getContent(language) {
  return (
    testimonialsTranslations[language] ||
    testimonialsTranslations.en
  );
}

function getVideoUrl(testimonial) {
  if (!testimonial?.video_url) {
    return null;
  }

  return testimonial.video_url;
}

function TestimonialCard({
  testimonial,
  content,
  onWatch,
}) {
  const videoUrl = getVideoUrl(testimonial);

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-purple/50 hover:shadow-2xl hover:shadow-purple/10">
      <div className="relative overflow-hidden bg-black">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-surface text-sm text-ink-muted">
            {content.unavailable}
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan">
          {testimonial.community_project}
        </p>

        <h3 className="mt-2 text-xl font-bold text-ink">
          {testimonial.client_name}
        </h3>

        {testimonial.short_description && (
          <p className="mt-4 leading-7 text-ink-muted">
            {testimonial.short_description}
          </p>
        )}

        {testimonial.written_testimonial && (
          <div className="mt-5 rounded-2xl border border-border bg-background/60 p-5">
            <p className="mb-2 text-xs font-semibold tracking-widest text-purple">
              {content.written}
            </p>

            <p className="whitespace-pre-wrap leading-7 text-ink-muted">
              “{testimonial.written_testimonial}”
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onWatch(testimonial)}
            className="rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-blue"
          >
            {content.watch}
          </button>

          {testimonial.discord_invite_url && (
            <a
              href={testimonial.discord_invite_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-cyan hover:text-cyan"
            >
              {content.viewCommunity}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function VideoModal({
  testimonial,
  content,
  onClose,
}) {
  if (!testimonial) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={content.close}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/90 text-xl text-ink"
        >
          ×
        </button>

        <video
          src={testimonial.video_url}
          controls
          autoPlay
          playsInline
          className="max-h-[75vh] w-full bg-black"
        />

        <div className="p-6">
          <p className="text-xs font-semibold tracking-widest text-cyan">
            {testimonial.community_project}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {testimonial.client_name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { language } = useLanguage();
  const content = getContent(language);

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState(null);

  useEffect(() => {
    async function loadTestimonials() {
      if (!supabase) {
        setLoadError(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("client_testimonials")
        .select("*")
        .eq("is_published", true)
        .order("display_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Testimonials load error:",
          error
        );
        setLoadError(true);
        setTestimonials([]);
      } else {
        setTestimonials(data || []);
      }

      setLoading(false);
    }

    loadTestimonials();
  }, []);

  return (
    <main className="bg-background text-ink">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.16),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.10),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-cyan">
              {content.label}
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-ink-muted sm:text-lg">
              {content.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan">
            {content.experience}
          </p>

          <p className="mt-4 leading-8 text-ink-muted">
            {content.experienceText}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-border bg-surface"
              >
                <div className="aspect-video animate-pulse bg-background" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-background" />
                  <div className="h-6 w-2/3 animate-pulse rounded bg-background" />
                  <div className="h-16 animate-pulse rounded bg-background" />
                </div>
              </div>
            ))}
          </div>
        ) : loadError ? (
          <div className="rounded-3xl border border-dashed border-border bg-surface p-10 text-center text-ink-muted">
            {content.unavailable}
          </div>
        ) : testimonials.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                content={content}
                onWatch={setSelectedTestimonial}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-surface p-10 text-center text-ink-muted">
            {content.noTestimonials}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-purple/30 bg-surface p-8 sm:p-12">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan">
            {content.startLabel}
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
            {content.startTitle}
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-ink-muted">
            {content.startText}
          </p>

          <Link
            to="/start-your-project"
            className="mt-8 inline-flex rounded-full bg-purple px-6 py-3 text-sm font-semibold text-ink transition hover:bg-blue"
          >
            {content.startButton}
          </Link>
        </div>
      </section>

      <VideoModal
        testimonial={selectedTestimonial}
        content={content}
        onClose={() => setSelectedTestimonial(null)}
      />
    </main>
  );
}
