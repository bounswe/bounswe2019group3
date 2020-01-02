--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: AnnotationResources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AnnotationResources" (
    target_annotation_id integer,
    body_annotation_id integer,
    _id integer NOT NULL,
    id character varying(255),
    value text,
    source character varying(255),
    type character varying(255),
    format character varying(255),
    language character varying(255),
    "processingLanguage" character varying(255),
    "textDirection" character varying(255),
    creator character varying(255),
    purpose character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AnnotationResources" OWNER TO postgres;

--
-- Name: AnnotationResources__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AnnotationResources__id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AnnotationResources__id_seq" OWNER TO postgres;

--
-- Name: AnnotationResources__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AnnotationResources__id_seq" OWNED BY public."AnnotationResources"._id;


--
-- Name: AnnotationSelectors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AnnotationSelectors" (
    id integer NOT NULL,
    resource_id integer,
    type character varying(255),
    value character varying(255),
    "conformsTo" character varying(255),
    exact character varying(255),
    prefix character varying(255),
    suffix character varying(255),
    start character varying(255),
    "end" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AnnotationSelectors" OWNER TO postgres;

--
-- Name: AnnotationSelectors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AnnotationSelectors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AnnotationSelectors_id_seq" OWNER TO postgres;

--
-- Name: AnnotationSelectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AnnotationSelectors_id_seq" OWNED BY public."AnnotationSelectors".id;


--
-- Name: Annotations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Annotations" (
    "@context" character varying(255) NOT NULL,
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    creator character varying(255),
    motivation character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Annotations" OWNER TO postgres;

--
-- Name: Annotations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Annotations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Annotations_id_seq" OWNER TO postgres;

--
-- Name: Annotations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Annotations_id_seq" OWNED BY public."Annotations".id;


--
-- Name: Auths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Auths" (
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Auths" OWNER TO postgres;

--
-- Name: Comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comments" (
    id integer NOT NULL,
    comment_to character varying(255) NOT NULL,
    rating double precision NOT NULL,
    text character varying(255) NOT NULL,
    comment_by character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Comments" OWNER TO postgres;

--
-- Name: Comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comments_id_seq" OWNER TO postgres;

--
-- Name: Comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comments_id_seq" OWNED BY public."Comments".id;


--
-- Name: ExamChoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExamChoices" (
    id integer NOT NULL,
    question_id integer NOT NULL,
    "desc" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ExamChoices" OWNER TO postgres;

--
-- Name: ExamChoices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ExamChoices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ExamChoices_id_seq" OWNER TO postgres;

--
-- Name: ExamChoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ExamChoices_id_seq" OWNED BY public."ExamChoices".id;


--
-- Name: ExamQuestions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExamQuestions" (
    id integer NOT NULL,
    lang_abbr character varying(255),
    "desc" character varying(255),
    answer_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ExamQuestions" OWNER TO postgres;

--
-- Name: ExamQuestions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ExamQuestions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ExamQuestions_id_seq" OWNER TO postgres;

--
-- Name: ExamQuestions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ExamQuestions_id_seq" OWNED BY public."ExamQuestions".id;


--
-- Name: ExerciseChoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExerciseChoices" (
    choice_id integer NOT NULL,
    question_id integer NOT NULL,
    "desc" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ExerciseChoices" OWNER TO postgres;

--
-- Name: ExerciseChoices_choice_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ExerciseChoices_choice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ExerciseChoices_choice_id_seq" OWNER TO postgres;

--
-- Name: ExerciseChoices_choice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ExerciseChoices_choice_id_seq" OWNED BY public."ExerciseChoices".choice_id;


--
-- Name: ExerciseProgresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExerciseProgresses" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    exercise_id integer NOT NULL,
    question_done integer NOT NULL,
    questions integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ExerciseProgresses" OWNER TO postgres;

--
-- Name: ExerciseProgresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ExerciseProgresses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ExerciseProgresses_id_seq" OWNER TO postgres;

--
-- Name: ExerciseProgresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ExerciseProgresses_id_seq" OWNED BY public."ExerciseProgresses".id;


--
-- Name: ExerciseQuestions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExerciseQuestions" (
    question_id integer NOT NULL,
    lang_abbr character varying(255),
    exercise_id integer,
    answer_id integer,
    "desc" text,
    media_url character varying(255),
    media_type character varying(255),
    media_start_time integer,
    media_end_time integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ExerciseQuestions" OWNER TO postgres;

--
-- Name: ExerciseQuestions_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ExerciseQuestions_question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ExerciseQuestions_question_id_seq" OWNER TO postgres;

--
-- Name: ExerciseQuestions_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ExerciseQuestions_question_id_seq" OWNED BY public."ExerciseQuestions".question_id;


--
-- Name: Exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Exercises" (
    exercise_id integer NOT NULL,
    title character varying(255),
    lang_abbr character varying(255),
    exercise_type character varying(255),
    level character varying(255),
    tags text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Exercises" OWNER TO postgres;

--
-- Name: Exercises_exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Exercises_exercise_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Exercises_exercise_id_seq" OWNER TO postgres;

--
-- Name: Exercises_exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Exercises_exercise_id_seq" OWNED BY public."Exercises".exercise_id;


--
-- Name: LanguageProgresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LanguageProgresses" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    lang_abbr character varying(255) NOT NULL,
    exercise_done integer[] NOT NULL,
    exercises integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."LanguageProgresses" OWNER TO postgres;

--
-- Name: LanguageProgresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LanguageProgresses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LanguageProgresses_id_seq" OWNER TO postgres;

--
-- Name: LanguageProgresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LanguageProgresses_id_seq" OWNED BY public."LanguageProgresses".id;


--
-- Name: Languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Languages" (
    abbr character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Languages" OWNER TO postgres;

--
-- Name: Levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Levels" (
    belongs_to character varying(255) NOT NULL,
    lang_abbr character varying(255) NOT NULL,
    grade character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Levels" OWNER TO postgres;

--
-- Name: Messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Messages" (
    id integer NOT NULL,
    to_username character varying(255) NOT NULL,
    from_username character varying(255) NOT NULL,
    message character varying(255) NOT NULL,
    new boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Messages" OWNER TO postgres;

--
-- Name: Messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Messages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Messages_id_seq" OWNER TO postgres;

--
-- Name: Messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Messages_id_seq" OWNED BY public."Messages".id;


--
-- Name: UserProfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserProfiles" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    bio character varying(255) NOT NULL,
    avatar character varying(255) NOT NULL,
    rating double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserProfiles" OWNER TO postgres;

--
-- Name: UserProfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserProfiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserProfiles_id_seq" OWNER TO postgres;

--
-- Name: UserProfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserProfiles_id_seq" OWNED BY public."UserProfiles".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    bio character varying(255),
    avatar character varying(255),
    rating double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Writings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Writings" (
    writing_id integer NOT NULL,
    title character varying(255),
    text text,
    image text,
    written_by character varying(255) NOT NULL,
    assignee character varying(255),
    lang_abbr character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Writings" OWNER TO postgres;

--
-- Name: Writings_writing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Writings_writing_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Writings_writing_id_seq" OWNER TO postgres;

--
-- Name: Writings_writing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Writings_writing_id_seq" OWNED BY public."Writings".writing_id;


--
-- Name: AnnotationResources _id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnotationResources" ALTER COLUMN _id SET DEFAULT nextval('public."AnnotationResources__id_seq"'::regclass);


--
-- Name: AnnotationSelectors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnotationSelectors" ALTER COLUMN id SET DEFAULT nextval('public."AnnotationSelectors_id_seq"'::regclass);


--
-- Name: Annotations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Annotations" ALTER COLUMN id SET DEFAULT nextval('public."Annotations_id_seq"'::regclass);


--
-- Name: Comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments" ALTER COLUMN id SET DEFAULT nextval('public."Comments_id_seq"'::regclass);


--
-- Name: ExamChoices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamChoices" ALTER COLUMN id SET DEFAULT nextval('public."ExamChoices_id_seq"'::regclass);


--
-- Name: ExamQuestions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamQuestions" ALTER COLUMN id SET DEFAULT nextval('public."ExamQuestions_id_seq"'::regclass);


--
-- Name: ExerciseChoices choice_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciseChoices" ALTER COLUMN choice_id SET DEFAULT nextval('public."ExerciseChoices_choice_id_seq"'::regclass);


--
-- Name: ExerciseProgresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciseProgresses" ALTER COLUMN id SET DEFAULT nextval('public."ExerciseProgresses_id_seq"'::regclass);


--
-- Name: ExerciseQuestions question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciseQuestions" ALTER COLUMN question_id SET DEFAULT nextval('public."ExerciseQuestions_question_id_seq"'::regclass);


--
-- Name: Exercises exercise_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercises" ALTER COLUMN exercise_id SET DEFAULT nextval('public."Exercises_exercise_id_seq"'::regclass);


--
-- Name: LanguageProgresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LanguageProgresses" ALTER COLUMN id SET DEFAULT nextval('public."LanguageProgresses_id_seq"'::regclass);


--
-- Name: Messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages" ALTER COLUMN id SET DEFAULT nextval('public."Messages_id_seq"'::regclass);


--
-- Name: UserProfiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles" ALTER COLUMN id SET DEFAULT nextval('public."UserProfiles_id_seq"'::regclass);


--
-- Name: Writings writing_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Writings" ALTER COLUMN writing_id SET DEFAULT nextval('public."Writings_writing_id_seq"'::regclass);


--
-- Data for Name: AnnotationResources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AnnotationResources" (target_annotation_id, body_annotation_id, _id, id, value, source, type, format, language, "processingLanguage", "textDirection", creator, purpose, "createdAt", "updatedAt") FROM stdin;
\N	1	1	\N	wrong word	\N	TextualBody	text/plain	\N	\N	\N	\N	\N	2020-01-01 21:32:43.563+00	2020-01-01 21:32:43.563+00
1	\N	2	\N	\N	http://18.184.207.248/api/writing/3	Text	\N	\N	\N	\N	orangelion929	\N	2020-01-01 21:32:43.564+00	2020-01-01 21:32:43.564+00
\.


--
-- Data for Name: AnnotationSelectors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AnnotationSelectors" (id, resource_id, type, value, "conformsTo", exact, prefix, suffix, start, "end", "createdAt", "updatedAt") FROM stdin;
1	2	FragmentSelector	char=208,216	http://tools.ietf.org/rfc/rfc5147	\N	\N	\N	\N	\N	2020-01-01 21:32:43.575+00	2020-01-01 21:32:43.575+00
\.


--
-- Data for Name: Annotations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Annotations" ("@context", id, type, creator, motivation, "createdAt", "updatedAt") FROM stdin;
http://www.w3.org/ns/anno.jsonld	1	Annotation	orangelion929	\N	2020-01-01 21:32:43.535+00	2020-01-01 21:32:43.535+00
\.


--
-- Data for Name: Auths; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Auths" (username, email, password, role, "createdAt", "updatedAt") FROM stdin;
admin	email1	1a1dc91c907325c69271ddf0c944bc72	ADMIN	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
user	email2	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
lazyostrich850	robby.vanbaren@example.com	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
angrydog556	zachary.pelletier@example.com	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
browncat819	lily.edwards@example.com	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
orangelion929	zachary.pelletier@example.com	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Anakin_Skywalker	email3	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Darth_Vader	email4	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Luke_Skywalker	email5	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Palpatine	email6	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Leia_Organa	email7	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Rey	email8	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Kylo_Ren	email9	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Master_Yoda	email10	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Obi-Wan_Kenobi	email11	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
C-3PO	email12	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Han_Solo	email13	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Chewbacca	email14	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Padmé_Amidala	email15	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
R2-D2	email16	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Jabba_the_Hutt	email17	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Mace_Windu	email18	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
BB-8	email19	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
Kont_Dooku	email20	1a1dc91c907325c69271ddf0c944bc72	USER	2020-01-01 13:59:06.816+00	2020-01-01 13:59:06.816+00
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comments" (id, comment_to, rating, text, comment_by, "createdAt", "updatedAt") FROM stdin;
1	lazyostrich850	5	This is truly above and beyond.	angrydog556	2020-01-01 13:59:06.861+00	2020-01-01 13:59:06.861+00
2	angrydog556	5	You set a high bar with this one.	browncat819	2020-01-01 13:59:06.861+00	2020-01-01 13:59:06.861+00
3	browncat819	5	Wonderful, this is more than I expected.	orangelion929	2020-01-01 13:59:06.861+00	2020-01-01 13:59:06.861+00
4	orangelion929	5	This is so great I don’t need to make any revisions to it at all.	angrydog556	2020-01-01 13:59:06.861+00	2020-01-01 13:59:06.861+00
5	orangelion929	5	You have a vibrant imagination and excels in creative writing.	lazyostrich850	2020-01-01 13:59:06.861+00	2020-01-01 13:59:06.861+00
\.


--
-- Data for Name: ExamChoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExamChoices" (id, question_id, "desc", "createdAt", "updatedAt") FROM stdin;
0	0	modern meteorology has made notable improvements in the critical discipline of predicting severe weather	2020-01-01 13:59:06.852+00	2020-01-01 13:59:06.852+00
1	0	meteorologists are the only professionals who can keep their jobs and still be wrong half the time	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
2	0	scientists have studied cloud seeding with the goal of making it rain in places experiencing prolonged droughts	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
3	0	the weather has been a subject of intense interest and scrutiny by human beings since ancient times	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
4	1	it matured into a system of thinking about nature that contributed to the development of modern chemistry	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
5	1	alchemistic ideas and practices flourished in the ancient world within several cultural traditions	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
6	1	a number of spectacular failures eventually led to the disappearance of alchemy in China	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
7	1	alchemists continued in their relentless quest for gold well into the sixteenth century	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
8	2	even if the area is unsafe and they have to work under armed guard	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
9	2	although it is the job of forensic scientists to provide evidence at a criminal trial	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
10	2	as many sciences, from chemistry to engineering, are used in an investigation	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
11	2	since forensic scientists study evidence at the homes and workplaces of suspects	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
12	3	the existence of twenty-five-thousand-year-old clothing suggests that footwear may be older than is even presently known	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
13	3	the elaborate weaving on some shoes seems to indicate that prehistoric people would care about the appearance of the shoes	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
14	3	prehistoric shoes had to resist heavy usage, whether made from leather or from plant fibers	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
15	3	the oldest known shoes are ten-thousand-year-old sandals found in a desert area of eastern Oregon of the US	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
16	4	since many small animals that live above the ground make their homes in trees	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
17	4	given that they make mud huts that are placed in all kinds of places, from undergrowth to fence posts	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
18	4	until they have learned how to look after themselves and survive in the wild on their own	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
19	4	while colonies of wasps build their nests from the top downward	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
20	5	Die Ernährungsweise und das Ernährungsverhalten der Bevölkerung haben sich dadurch nicht gebessert	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
21	5	Erfolge einer guten Ernährung lassen sich nicht innerhalb weniger Tagen oder Wochen nachweisen	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
22	5	Kohlenhydratreiche Lebensmittel werden nicht nur zu wenig konsumiert	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
23	5	Ernährungsformen, die nur pflanzliche Lebensmittel umfassen, sind nicht gesund	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
24	6	würde die globale Erwärmung noch weitere Jahrhunderte anhalten	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
25	6	würde unsere Umwelt weiterhin entlastet werden	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
26	6	müsste man die Müllentsorgung ernster nehmen	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
27	6	sollte man sich mit den Folgen der Luftverschmutzung auseinandersetzen	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
28	7	klagt fast jeder zweite Arbeitnehmer über steigenden Druck und permanente Erreichbarkeit	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
29	7	denn Gebildete achten stärker auf ihre Gesundheit und können sich im Krankheitsfall Hilfe holen	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
30	7	wird deswegen angedeutet, dass er ein geringeres Demenzrisiko hat	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
31	7	hat ein gleichaltriger Bergarbeiter statistisch gesehen nur noch 26 Jahre vor sich	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
32	8	obwohl sie Kriminalität und Terrorismus begünstigen	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
33	8	damit die Weltbevölkerung diese Probleme gemeinsam aufgreift	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
34	8	mit denen die Menschheit heutzutage konfrontiert ist	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
35	8	weil sich das Wirtschaftswachstum in den letzten Jahren verbessert hat	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
36	9	da es nach der Geburt geruchlos ist und von anderen Tieren nicht gewittert werden kann	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
37	9	dass seine Mutter es vor Jägern und Raubtieren aller Art bewahrt	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
38	9	obwohl Hirsche und Rehe ihren Nachwuchs mit großer Sorgfalt zu beschützen versuchen	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
39	9	falls es sich auf der Suche nach Nahrung verirrt und von Jägern eingefangen wird	2020-01-01 13:59:06.853+00	2020-01-01 13:59:06.853+00
\.


--
-- Data for Name: ExamQuestions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExamQuestions" (id, lang_abbr, "desc", answer_id, "createdAt", "updatedAt") FROM stdin;
0	en	Because of its power and potential for both harm and good, ----.	3	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
1	en	Although alchemy began as a way to turn other metals into gold, ----.	4	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
2	en	Forensic investigators must collect evidence while the crime scene is still fresh ----.	8	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
3	en	Although the available evidence shows no use of colour or decoration on early footwear, ----.	13	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
4	en	Some birds build nests simply to protect their young ----.	18	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
5	de	----, sondern benötigen meist Monate oder Jahre, um sichtbar zu werden.	21	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
6	de	Selbst wenn die Kohlenstoffdioxid-Emissionen heute drastisch reduziert würden, ----.	24	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
7	de	Während etwa ein 40-jähriger Lehrer noch mit 40 weiteren Jahren Lebenszeit rechnen kann, ----.	31	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
8	de	Armut und Rückständigkeit sind eine der gefährlichsten Herausforderungen, ----.	34	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
9	de	Ein neugeborenes Rehkitz wird so gut wie nie von Fressfeinden angegriffen, ----.	36	2020-01-01 13:59:06.847+00	2020-01-01 13:59:06.847+00
\.


--
-- Data for Name: ExerciseChoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciseChoices" (choice_id, question_id, "desc", "createdAt", "updatedAt") FROM stdin;
1	1	They get to do a range of tasks	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
2	1	They often suggest new idead 	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
3	1	They sometimes arrive late	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
4	1	All of them	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
5	2	He's made a lot of new friends.	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
6	2	His teachers are pleased with hi progress	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
7	2	He find his accommodation is very convenient	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
8	2	None of them	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
9	3	to disagree with a previous caller.	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
10	3	to warn other listeners about something	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
11	3	to explain how she feels about something	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
12	3	to warn about global warming	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
13	4	 the animals which were featured	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
14	4	the quality of the photography	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
15	4	the style of the commentary	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
16	4	the extinction of the lions	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
17	5	  his workplace	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
18	5	a shopping centre	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
19	5	 the house of a friend	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
20	5	none of these	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
21	6	advise young people about how to get to university.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
22	6	tell young people about the options available.	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
23	6	 advise young people to stay in education.	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
24	6	all of them	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
25	7	 go to university immediately.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
26	7	stay at the same school for two more years.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
27	7	go to high school for two more years, then get a degree.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
28	7	make a trip to China	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
29	8	good exam results. 	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
30	8	facilities.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
31	8	 humanities and sciences.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
32	8	all of these	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
33	9	 pay tuition fees.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
34	9	pass an exam.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
35	9	study both humanities and sciences.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
36	9	none of these	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
37	10	pass an exam.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
38	10	are a boy. 	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
39	10	can afford the tuition fees.	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
40	10	are less than 17 years old	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
41	11	because of 	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
42	11	due to 	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
43	11	because	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
44	11	instead	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
45	12	will be arriving	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
46	12	will arriving	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
47	12	will be arrive	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
48	12	will going to	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
49	13	could be	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
50	13	would be	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
51	13	were	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
52	13	will be	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
53	14	they are?	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
54	14	is it?	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
55	14	 he’s? 	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
56	14	is she?	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
57	15	Jemma is too beautiful. She’s the prettiest girl I know. 	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
58	15	Change your clothes! Those clothes are too dirty.  	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
59	15	Don’t drive too fast. You’ll have an accident. 	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
60	15	none of them	2020-01-01 13:59:06.888+00	2020-01-01 13:59:06.888+00
\.


--
-- Data for Name: ExerciseProgresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciseProgresses" (id, username, exercise_id, question_done, questions, "createdAt", "updatedAt") FROM stdin;
1	lazyostrich850	1	3	5	2020-01-01 13:59:06.901+00	2020-01-01 13:59:06.901+00
2	lazyostrich850	2	4	5	2020-01-01 13:59:06.901+00	2020-01-01 13:59:06.901+00
3	angrydog556	3	2	5	2020-01-01 13:59:06.901+00	2020-01-01 13:59:06.901+00
4	angrydog556	4	5	5	2020-01-01 13:59:06.901+00	2020-01-01 13:59:06.901+00
5	Darth_Vader	1	0	5	2020-01-01 21:34:02.138+00	2020-01-01 21:34:02.138+00
6	Darth_Vader	3	0	5	2020-01-01 21:34:02.158+00	2020-01-01 21:34:02.159+00
7	Darth_Vader	2	0	5	2020-01-01 21:34:02.159+00	2020-01-01 21:34:02.159+00
8	Darth_Vader	4	0	1	2020-01-01 21:34:02.163+00	2020-01-01 21:34:02.163+00
9	user	1	0	5	2020-01-02 00:35:09.271+00	2020-01-02 00:35:09.271+00
10	user	2	0	5	2020-01-02 00:35:09.275+00	2020-01-02 00:35:09.275+00
11	user	3	0	5	2020-01-02 00:35:09.317+00	2020-01-02 00:35:09.317+00
12	user	4	0	1	2020-01-02 00:35:09.325+00	2020-01-02 00:35:09.325+00
\.


--
-- Data for Name: ExerciseQuestions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciseQuestions" (question_id, lang_abbr, exercise_id, answer_id, "desc", media_url, media_type, media_start_time, media_end_time, "createdAt", "updatedAt") FROM stdin;
1	en	1	1	You hear a hotel manager talking about the staff who work for her.What does she say about them?	api/uploads/listenings/ZoUCAGV0UeQ.mp4	mp4	51	84	2020-01-01 13:59:06.884+00	2020-01-01 13:59:06.884+00
2	en	1	7	You hear a student talking on the phone.What does he say about life at college?	api/uploads/listenings/ZoUCAGV0UeQ.mp4	mp4	88	116	2020-01-01 13:59:06.884+00	2020-01-01 13:59:06.884+00
3	en	1	11	You hear a caller on a radio phone-in programme. Why has she phoned?	api/uploads/listenings/ZoUCAGV0UeQ.mp4	mp4	235	295	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
4	en	1	14	You hear a man talking about a wildlife documentary. What aspect of it disappointed him?	api/uploads/listenings/ZoUCAGV0UeQ.mp4	mp4	328	367	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
5	en	1	17	You overhear two people talking in a cafe. The man has just come from?	api/uploads/listenings/ZoUCAGV0UeQ.mp4	mp4	438	467	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
6	en	2	22	You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next.If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre.St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more.Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more.A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College.The aim of the article is to…	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
7	en	2	27	You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next.If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre.St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more.Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more.A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College. The article advises reader who want a professional career to…	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
8	en	2	29	You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next.If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre.St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more.Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more.A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College.St Leopold’s is the best school for…	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
9	en	2	33	You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next.If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre.St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more.Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more.A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College.You can only attend St Leopold’s school if you…	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
10	en	2	37	You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next.If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre.St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more.Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more.A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College.You can only attend Knowle Grammar School if you…	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
11	en	3	41	 Which word or phrase CANNOT complete the sentence?…The match was cancelled ____ the rain.	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
12	en	3	45	 Complete the sentence.Alex ___ late. He’s stuck in traffic.	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
13	en	3	51	What would you do if there _____ an earthquake?	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
14	en	3	55	Do you know how tall ____?	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
15	en	3	57	Which sentence uses too incorrectly?	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
16	en	4	\N	Discuss some of the arguments for and against keeping animals in zoos.	\N	\N	\N	\N	2020-01-01 13:59:06.885+00	2020-01-01 13:59:06.885+00
\.


--
-- Data for Name: Exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Exercises" (exercise_id, title, lang_abbr, exercise_type, level, tags, "createdAt", "updatedAt") FROM stdin;
1	Listening Exercise- Sample	en	listening	B2	phone, conversation, documentary	2020-01-01 13:59:06.879+00	2020-01-01 13:59:06.879+00
2	Reading Exercise-Sample	en	reading	A2	school, career, youth	2020-01-01 13:59:06.879+00	2020-01-01 13:59:06.879+00
3	Grammar Exercise-Sample	en	grammar	B1	conditionals,future tense,past tense	2020-01-01 13:59:06.879+00	2020-01-01 13:59:06.879+00
4	Writing Exercise-Sample	en	writing	B1	animal,zoo	2020-01-01 13:59:06.879+00	2020-01-01 13:59:06.879+00
\.


--
-- Data for Name: LanguageProgresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LanguageProgresses" (id, username, lang_abbr, exercise_done, exercises, "createdAt", "updatedAt") FROM stdin;
1	lazyostrich850	en	{1,2}	4	2020-01-01 13:59:06.898+00	2020-01-01 13:59:06.898+00
2	lazyostrich850	de	{4}	4	2020-01-01 13:59:06.898+00	2020-01-01 13:59:06.898+00
3	angrydog556	en	{2}	4	2020-01-01 13:59:06.898+00	2020-01-01 13:59:06.898+00
4	angrydog556	de	{3,4}	4	2020-01-01 13:59:06.898+00	2020-01-01 13:59:06.898+00
5	Darth_Vader	en	{}	4	2020-01-01 21:34:02.03+00	2020-01-01 21:34:02.031+00
6	Darth_Vader	de	{}	0	2020-01-01 21:34:02.043+00	2020-01-01 21:34:02.043+00
7	user	en	{}	4	2020-01-02 00:35:09.201+00	2020-01-02 00:35:09.201+00
8	user	de	{}	0	2020-01-02 00:35:09.249+00	2020-01-02 00:35:09.249+00
\.


--
-- Data for Name: Languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Languages" (abbr, name, "createdAt", "updatedAt") FROM stdin;
en	English	2020-01-01 13:59:06.835+00	2020-01-01 13:59:06.835+00
de	Deutsch	2020-01-01 13:59:06.836+00	2020-01-01 13:59:06.836+00
\.


--
-- Data for Name: Levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Levels" (belongs_to, lang_abbr, grade, "createdAt", "updatedAt") FROM stdin;
lazyostrich850	en	B2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
lazyostrich850	de	A2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
angrydog556	en	C1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
angrydog556	de	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
browncat819	en	C2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
browncat819	de	C1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
orangelion929	en	A2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
orangelion929	de	C1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Anakin_Skywalker	en	B2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Darth_Vader	en	B2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Luke_Skywalker	en	B1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Palpatine	de	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Leia_Organa	de	A2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Rey	de	A2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Kylo_Ren	de	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Master_Yoda	en	C1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Obi-Wan_Kenobi	en	B2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
C-3PO	de	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Han_Solo	en	B2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Chewbacca	en	B1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Padmé_Amidala	en	A2	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
R2-D2	en	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Jabba_the_Hutt	en	B1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Mace_Windu	en	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
BB-8	en	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Kont_Dooku	en	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
Poe_Dameron	en	A1	2020-01-01 13:59:06.867+00	2020-01-01 13:59:06.867+00
\.


--
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Messages" (id, to_username, from_username, message, new, "createdAt", "updatedAt") FROM stdin;
1	angrydog556	lazyostrich850	Hi there	t	2020-01-01 13:59:06.875+00	2020-01-01 13:59:06.875+00
2	lazyostrich850	angrydog556	Hi, how are you?	t	2020-01-01 13:59:06.876+00	2020-01-01 13:59:06.876+00
3	angrydog556	lazyostrich850	Thanks, I'm fine.Are you expert in writing?Can you help me?	t	2020-01-01 13:59:06.876+00	2020-01-01 13:59:06.876+00
4	lazyostrich850	angrydog556	Sure, if you send me your essay, I can check it.	t	2020-01-01 13:59:06.876+00	2020-01-01 13:59:06.876+00
5	browncat819	orangelion929	Hi orangelion, how are you?	t	2020-01-01 13:59:06.876+00	2020-01-01 13:59:06.876+00
7	browncat819	orangelion929	Thanks, I'm fine.Are you expert in writing?Can you help me?	t	2020-01-01 13:59:06.876+00	2020-01-01 13:59:06.876+00
6	orangelion929	browncat819	Hi, how are you?	f	2020-01-01 13:59:06.876+00	2020-01-01 21:49:36.798+00
8	orangelion929	browncat819	Sure, if you send me your essay, I can check it.I am going to wait you to send me your essay :)	f	2020-01-01 13:59:06.876+00	2020-01-01 21:49:36.798+00
\.


--
-- Data for Name: UserProfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserProfiles" (id, username, email, bio, avatar, rating, "createdAt", "updatedAt") FROM stdin;
0	yusuf	yusufsabribayrakdar@gmail.com	Student at BOUN	https://avatars.githubusercontent.com/yusufbayrakdar?size=70	5	2019-10-17 02:19:37.142+00	2019-10-17 02:19:37.142+00
1	bayrakdar	sabri.bayrakdar@boun.edu.tr	Student at BOUN	https://avatars.githubusercontent.com/yusufbayrakdar?size=70	5	2019-10-17 02:19:37.142+00	2019-10-17 02:19:37.142+00
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (username, email, bio, avatar, rating, "createdAt", "updatedAt") FROM stdin;
admin	email1	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	1	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
user	email2	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	1	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Anakin_Skywalker	email3	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	5	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Darth_Vader	email4	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	5	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Luke_Skywalker	email5	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	4	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Palpatine	email6	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	2	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Leia_Organa	email7	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	3	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Rey	email8	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	3	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Kylo_Ren	email9	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	1	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Master_Yoda	email10	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	4	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Obi-Wan_Kenobi	email11	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	4	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
C-3PO	email12	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	2	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Han_Solo	email13	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	4	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Chewbacca	email14	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	4	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Padmé_Amidala	email15	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	2	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
R2-D2	email16	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	2	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Jabba_the_Hutt	email17	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	3	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Mace_Windu	email18	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	1	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
BB-8	email19	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	2	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Kont_Dooku	email20	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	1	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
Poe_Dameron	email21	Anonymous	https://randomuser.me/api/portraits/lego/2.jpg	1	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
lazyostrich850	robby.vanbaren@example.com	I am Robby Van Baren, and I live in Wessem, Netherlands.I want to learn foreign languages.	https://randomuser.me/api/portraits/men/57.jpg	3	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
angrydog556	zachary.pelletier@exarmple.com	I am Zachary Pelletier, and I live in Fountainbleu, Canada.I want to learn foreign languages.	https://randomuser.me/api/portraits/men/42.jpg	5	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
browncat819	lily.edwards@example.com	I am Lily Edwards, and I live in Whangarei, New Zealand.I want to learn foreign languages.	https://randomuser.me/api/portraits/women/82.jpg	4	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
orangelion929	elza.vieira@example.com	I am Elza Vieira, and I live in Poços de Caldas, Brazil.I want to learn foreign languages.	https://randomuser.me/api/portraits/women/72.jpg	5	2020-01-01 13:59:06.864+00	2020-01-01 13:59:06.864+00
\.


--
-- Data for Name: Writings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Writings" (writing_id, title, text, image, written_by, assignee, lang_abbr, "createdAt", "updatedAt") FROM stdin;
1	No real essay	You’re 16 and finally you can leave school!  By now, you’re probably sick of teachers, desks, tests and exams.  But don’t just run for the exit. You need to think carefully about what to do next.If you want a professional career, you will need to go to university and get a degree. To do that, you need to stay at high school for another two years.  But you needn’t stay at the same place. There are several options in the district of Northacre.St. Leopold’s School has the best pass rate of all the high schools in the district. It offers a wide range of subjects in the humanities and sciences.  St Leopold’s is, of course, a private school, so may be too expensive for you. But don’t worry, there are several other options if you want to follow the academic route.  Knowle Grammar School is a state school, so there are no fees, and it has excellent tuition and facilities. It is a boys’ school from the ages of 11-16, but from 16-18 it is co-educational. But it is selective, so you’ll have to pass an exam to get in.  If you’re interested in going into Business, check out Wyle River Academy.  This school specialises in subjects like Business Studies, Management and Economics.  If you prefer the arts, look at the courses on offer at Northacre College.  Here you can study woodwork, art, textiles and much more.Northacre College also offers a wide range of vocational qualifications.  You can do a 1-year certificate or a 2-year diploma in subjects like electrics, plumbing, roofing and hairdressing.  If you’d prefer to work outdoors, look at Milldown College, where there are courses in Farm Mechanics, Land Management, Animal Management and much more.A final option is to get an apprenticeship with a local or national company.  You will get on-the-job training, gain certificates or diplomas and start earning straight away.  But be warned - places are limited!  Find out more at the Jobs Fair on 26th May at Northacre College.You can only attend Knowle Grammar School if you…	\N	lazyostrich850	angrydog556	en	2020-01-01 13:59:06.902+00	2020-01-01 13:59:06.902+00
2	Hand-Written	\N	api/uploads/writings/28d348c8882876673aec85c023593e67.jpg	browncat819	orangelion929	en	2020-01-01 21:23:55.017+00	2020-01-01 21:23:55.017+00
3	Narrative Essay	"Looking back on a childhood filled with events and memories, I find it rather difficult to pick one that leaves me with the fabled "warm and fuzzy feelings." As the daughter of an Air Force major, I had the pleasure of traveling across America in many moving trips. I have visited the monstrous trees of the Sequoia National Forest, stood on the edge of the Grand Canyon and have jumped on the beds at Caesar's Palace in Lake Tahoe."\n\n"The day I picked my dog up from the pound was one of the happiest days of both of our lives. I had gone to the pound just a week earlier with the idea that I would just "look" at a puppy. Of course, you can no more just look at those squiggling little faces so filled with hope and joy than you can stop the sun from setting in the evening. I knew within minutes of walking in the door that I would get a puppy… but it wasn't until I saw him that I knew I had found my puppy."\n\n"Looking for houses was supposed to be a fun and exciting process. Unfortunately, none of the ones that we saw seemed to match the specifications that we had established. They were too small, too impersonal, too close to the neighbors. After days of finding nothing even close, we began to wonder: was there really a perfect house out there for us?"	\N	lazyostrich850	orangelion929	en	2020-01-01 21:28:19.288+00	2020-01-01 21:28:19.288+00
\.


--
-- Name: AnnotationResources__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AnnotationResources__id_seq"', 2, true);


--
-- Name: AnnotationSelectors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AnnotationSelectors_id_seq"', 1, true);


--
-- Name: Annotations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Annotations_id_seq"', 1, true);


--
-- Name: Comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comments_id_seq"', 5, true);


--
-- Name: ExamChoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExamChoices_id_seq"', 1, false);


--
-- Name: ExamQuestions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExamQuestions_id_seq"', 1, false);


--
-- Name: ExerciseChoices_choice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExerciseChoices_choice_id_seq"', 60, true);


--
-- Name: ExerciseProgresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExerciseProgresses_id_seq"', 12, true);


--
-- Name: ExerciseQuestions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExerciseQuestions_question_id_seq"', 16, true);


--
-- Name: Exercises_exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Exercises_exercise_id_seq"', 4, true);


--
-- Name: LanguageProgresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LanguageProgresses_id_seq"', 8, true);


--
-- Name: Messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Messages_id_seq"', 8, true);


--
-- Name: UserProfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserProfiles_id_seq"', 1, false);


--
-- Name: Writings_writing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Writings_writing_id_seq"', 3, true);


--
-- Name: AnnotationResources AnnotationResources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnotationResources"
    ADD CONSTRAINT "AnnotationResources_pkey" PRIMARY KEY (_id);


--
-- Name: AnnotationSelectors AnnotationSelectors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnotationSelectors"
    ADD CONSTRAINT "AnnotationSelectors_pkey" PRIMARY KEY (id);


--
-- Name: Annotations Annotations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Annotations"
    ADD CONSTRAINT "Annotations_pkey" PRIMARY KEY (id);


--
-- Name: Auths Auths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Auths"
    ADD CONSTRAINT "Auths_pkey" PRIMARY KEY (username);


--
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- Name: ExamChoices ExamChoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamChoices"
    ADD CONSTRAINT "ExamChoices_pkey" PRIMARY KEY (id);


--
-- Name: ExamQuestions ExamQuestions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamQuestions"
    ADD CONSTRAINT "ExamQuestions_pkey" PRIMARY KEY (id);


--
-- Name: ExerciseChoices ExerciseChoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciseChoices"
    ADD CONSTRAINT "ExerciseChoices_pkey" PRIMARY KEY (choice_id);


--
-- Name: ExerciseProgresses ExerciseProgresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciseProgresses"
    ADD CONSTRAINT "ExerciseProgresses_pkey" PRIMARY KEY (id);


--
-- Name: ExerciseQuestions ExerciseQuestions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciseQuestions"
    ADD CONSTRAINT "ExerciseQuestions_pkey" PRIMARY KEY (question_id);


--
-- Name: Exercises Exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercises"
    ADD CONSTRAINT "Exercises_pkey" PRIMARY KEY (exercise_id);


--
-- Name: LanguageProgresses LanguageProgresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LanguageProgresses"
    ADD CONSTRAINT "LanguageProgresses_pkey" PRIMARY KEY (id);


--
-- Name: Languages Languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Languages"
    ADD CONSTRAINT "Languages_pkey" PRIMARY KEY (abbr);


--
-- Name: Levels Levels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Levels"
    ADD CONSTRAINT "Levels_pkey" PRIMARY KEY (belongs_to, lang_abbr, grade);


--
-- Name: Messages Messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);


--
-- Name: UserProfiles UserProfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_pkey" PRIMARY KEY (id, username);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (username);


--
-- Name: Writings Writings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Writings"
    ADD CONSTRAINT "Writings_pkey" PRIMARY KEY (writing_id);


--
-- Name: AnnotationResources AnnotationResources_body_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnotationResources"
    ADD CONSTRAINT "AnnotationResources_body_annotation_id_fkey" FOREIGN KEY (body_annotation_id) REFERENCES public."Annotations"(id) ON DELETE CASCADE;


--
-- Name: AnnotationResources AnnotationResources_target_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnotationResources"
    ADD CONSTRAINT "AnnotationResources_target_annotation_id_fkey" FOREIGN KEY (target_annotation_id) REFERENCES public."Annotations"(id) ON DELETE CASCADE;


--
-- Name: AnnotationSelectors AnnotationSelectors_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AnnotationSelectors"
    ADD CONSTRAINT "AnnotationSelectors_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES public."AnnotationResources"(_id) ON DELETE CASCADE;


--
-- Name: ExamQuestions ExamQuestions_lang_abbr_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExamQuestions"
    ADD CONSTRAINT "ExamQuestions_lang_abbr_fkey" FOREIGN KEY (lang_abbr) REFERENCES public."Languages"(abbr) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Exercises Exercises_lang_abbr_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercises"
    ADD CONSTRAINT "Exercises_lang_abbr_fkey" FOREIGN KEY (lang_abbr) REFERENCES public."Languages"(abbr) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

