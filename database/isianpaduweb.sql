PGDMP  .    1                }            isianpaduweb    16.4    16.4 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16634    isianpaduweb    DATABASE     �   CREATE DATABASE isianpaduweb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE isianpaduweb;
                postgres    false                        2615    35680    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    35734    Certificates    TABLE       CREATE TABLE public."Certificates" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 "   DROP TABLE public."Certificates";
       public         heap    postgres    false    5            �            1259    35733    Certificates_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Certificates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Certificates_id_seq";
       public          postgres    false    225    5            �           0    0    Certificates_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Certificates_id_seq" OWNED BY public."Certificates".id;
          public          postgres    false    224                       1259    60470    Clients    TABLE     E  CREATE TABLE public."Clients" (
    name text NOT NULL,
    logo text,
    category text NOT NULL,
    "projectNumber" text NOT NULL,
    date text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public."Clients";
       public         heap    postgres    false    5                       1259    64542    Clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Clients_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Clients_id_seq";
       public          postgres    false    258    5            �           0    0    Clients_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Clients_id_seq" OWNED BY public."Clients".id;
          public          postgres    false    260            �            1259    35774    CompanyBackground    TABLE     $  CREATE TABLE public."CompanyBackground" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "Image" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 '   DROP TABLE public."CompanyBackground";
       public         heap    postgres    false    5            �            1259    35773    CompanyBackground_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CompanyBackground_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."CompanyBackground_id_seq";
       public          postgres    false    231    5            �           0    0    CompanyBackground_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."CompanyBackground_id_seq" OWNED BY public."CompanyBackground".id;
          public          postgres    false    230            �            1259    40954 	   CoreValue    TABLE     �   CREATE TABLE public."CoreValue" (
    id integer NOT NULL,
    title text NOT NULL,
    present text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."CoreValue";
       public         heap    postgres    false    5            �            1259    40953    CoreValue_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CoreValue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."CoreValue_id_seq";
       public          postgres    false    249    5            �           0    0    CoreValue_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."CoreValue_id_seq" OWNED BY public."CoreValue".id;
          public          postgres    false    248            �            1259    35724    Experiences    TABLE     *  CREATE TABLE public."Experiences" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    logo text NOT NULL,
    date text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."Experiences";
       public         heap    postgres    false    5            �            1259    36359    ExperiencesGenralInfo    TABLE       CREATE TABLE public."ExperiencesGenralInfo" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 +   DROP TABLE public."ExperiencesGenralInfo";
       public         heap    postgres    false    5            �            1259    36358    ExperiencesGenralInfo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ExperiencesGenralInfo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."ExperiencesGenralInfo_id_seq";
       public          postgres    false    243    5            �           0    0    ExperiencesGenralInfo_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."ExperiencesGenralInfo_id_seq" OWNED BY public."ExperiencesGenralInfo".id;
          public          postgres    false    242            �            1259    35723    Experiences_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Experiences_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Experiences_id_seq";
       public          postgres    false    5    223            �           0    0    Experiences_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Experiences_id_seq" OWNED BY public."Experiences".id;
          public          postgres    false    222                       1259    65712    Faq    TABLE     �   CREATE TABLE public."Faq" (
    id integer NOT NULL,
    question text NOT NULL,
    answers text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Faq";
       public         heap    postgres    false    5                       1259    65711 
   Faq_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Faq_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public."Faq_id_seq";
       public          postgres    false    5    263            �           0    0 
   Faq_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public."Faq_id_seq" OWNED BY public."Faq".id;
          public          postgres    false    262            �            1259    36973    Font    TABLE     �   CREATE TABLE public."Font" (
    id integer NOT NULL,
    title text NOT NULL,
    font text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Font";
       public         heap    postgres    false    5            �            1259    36972    Font_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Font_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Font_id_seq";
       public          postgres    false    5    245            �           0    0    Font_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Font_id_seq" OWNED BY public."Font".id;
          public          postgres    false    244            �            1259    46953    Footer    TABLE     s  CREATE TABLE public."Footer" (
    id integer NOT NULL,
    address text NOT NULL,
    description text,
    copyright text,
    location text NOT NULL,
    email text NOT NULL,
    phone text,
    "workingHourse" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Footer";
       public         heap    postgres    false    5            �            1259    46952    Footer_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Footer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Footer_id_seq";
       public          postgres    false    255    5            �           0    0    Footer_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Footer_id_seq" OWNED BY public."Footer".id;
          public          postgres    false    254            �            1259    35764    GeneralInfo    TABLE       CREATE TABLE public."GeneralInfo" (
    id integer NOT NULL,
    title text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."GeneralInfo";
       public         heap    postgres    false    5            �            1259    35763    GeneralInfo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."GeneralInfo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."GeneralInfo_id_seq";
       public          postgres    false    5    229            �           0    0    GeneralInfo_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."GeneralInfo_id_seq" OWNED BY public."GeneralInfo".id;
          public          postgres    false    228            �            1259    37627 
   HeaderHome    TABLE     6  CREATE TABLE public."HeaderHome" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    opacity text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public."HeaderHome";
       public         heap    postgres    false    5            �            1259    37626    HeaderHome_id_seq    SEQUENCE     �   CREATE SEQUENCE public."HeaderHome_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."HeaderHome_id_seq";
       public          postgres    false    5    247                        0    0    HeaderHome_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."HeaderHome_id_seq" OWNED BY public."HeaderHome".id;
          public          postgres    false    246            �            1259    41712    HeaderPages    TABLE       CREATE TABLE public."HeaderPages" (
    id integer NOT NULL,
    title text,
    image text NOT NULL,
    opacity text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."HeaderPages";
       public         heap    postgres    false    5            �            1259    41711    HeaderPages_id_seq    SEQUENCE     �   CREATE SEQUENCE public."HeaderPages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."HeaderPages_id_seq";
       public          postgres    false    5    251                       0    0    HeaderPages_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."HeaderPages_id_seq" OWNED BY public."HeaderPages".id;
          public          postgres    false    250            �            1259    36349    HomeGeneralInfo    TABLE     s  CREATE TABLE public."HomeGeneralInfo" (
    id integer NOT NULL,
    title1 text NOT NULL,
    title2 text NOT NULL,
    content text NOT NULL,
    image1 text NOT NULL,
    image2 text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    height text,
    width text
);
 %   DROP TABLE public."HomeGeneralInfo";
       public         heap    postgres    false    5            �            1259    36348    HomeGeneralInfo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."HomeGeneralInfo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."HomeGeneralInfo_id_seq";
       public          postgres    false    5    241                       0    0    HomeGeneralInfo_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."HomeGeneralInfo_id_seq" OWNED BY public."HomeGeneralInfo".id;
          public          postgres    false    240                       1259    59545    InHouseProjects    TABLE     X  CREATE TABLE public."InHouseProjects" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    ldescription text NOT NULL,
    image text NOT NULL,
    date text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 %   DROP TABLE public."InHouseProjects";
       public         heap    postgres    false    5                        1259    59544    InHouseProjects_id_seq    SEQUENCE     �   CREATE SEQUENCE public."InHouseProjects_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."InHouseProjects_id_seq";
       public          postgres    false    257    5                       0    0    InHouseProjects_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."InHouseProjects_id_seq" OWNED BY public."InHouseProjects".id;
          public          postgres    false    256            �            1259    35694 
   NewsEvents    TABLE     �  CREATE TABLE public."NewsEvents" (
    id integer NOT NULL,
    title character varying(225) NOT NULL,
    description text NOT NULL,
    short_description character varying(225) NOT NULL,
    date text NOT NULL,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    extra_images text[]
);
     DROP TABLE public."NewsEvents";
       public         heap    postgres    false    5            �            1259    35693    NewsEvents_id_seq    SEQUENCE     �   CREATE SEQUENCE public."NewsEvents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."NewsEvents_id_seq";
       public          postgres    false    217    5                       0    0    NewsEvents_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."NewsEvents_id_seq" OWNED BY public."NewsEvents".id;
          public          postgres    false    216            �            1259    35704    Partners    TABLE     �   CREATE TABLE public."Partners" (
    id integer NOT NULL,
    name text NOT NULL,
    logo text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Partners";
       public         heap    postgres    false    5            �            1259    35703    Partners_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Partners_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Partners_id_seq";
       public          postgres    false    219    5                       0    0    Partners_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Partners_id_seq" OWNED BY public."Partners".id;
          public          postgres    false    218            �            1259    35814    ProgressBar    TABLE     �   CREATE TABLE public."ProgressBar" (
    id integer NOT NULL,
    title text NOT NULL,
    present text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."ProgressBar";
       public         heap    postgres    false    5            �            1259    35813    ProgressBar_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ProgressBar_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."ProgressBar_id_seq";
       public          postgres    false    5    239                       0    0    ProgressBar_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."ProgressBar_id_seq" OWNED BY public."ProgressBar".id;
          public          postgres    false    238                       1259    61432    Project    TABLE     8  CREATE TABLE public."Project" (
    title text NOT NULL,
    date text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    id integer NOT NULL,
    "clientId" integer NOT NULL
);
    DROP TABLE public."Project";
       public         heap    postgres    false    5                       1259    64552    Project_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Project_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Project_id_seq";
       public          postgres    false    5    259                       0    0    Project_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Project_id_seq" OWNED BY public."Project".id;
          public          postgres    false    261            �            1259    35714    Services    TABLE     \  CREATE TABLE public."Services" (
    id integer NOT NULL,
    title text NOT NULL,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    description text,
    "hsDescription" text,
    image2 text,
    image3 text,
    "lDescription" text
);
    DROP TABLE public."Services";
       public         heap    postgres    false    5            �            1259    35794    ServicesOne    TABLE       CREATE TABLE public."ServicesOne" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."ServicesOne";
       public         heap    postgres    false    5            �            1259    35793    ServicesOne_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ServicesOne_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."ServicesOne_id_seq";
       public          postgres    false    235    5                       0    0    ServicesOne_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."ServicesOne_id_seq" OWNED BY public."ServicesOne".id;
          public          postgres    false    234            �            1259    35804    ServicesTwo    TABLE     8  CREATE TABLE public."ServicesTwo" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    reference text NOT NULL,
    icon text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."ServicesTwo";
       public         heap    postgres    false    5            �            1259    35803    ServicesTwo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ServicesTwo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."ServicesTwo_id_seq";
       public          postgres    false    5    237            	           0    0    ServicesTwo_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."ServicesTwo_id_seq" OWNED BY public."ServicesTwo".id;
          public          postgres    false    236            �            1259    35713    Services_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Services_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Services_id_seq";
       public          postgres    false    5    221            
           0    0    Services_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Services_id_seq" OWNED BY public."Services".id;
          public          postgres    false    220            �            1259    35754    TeamOrDirectors    TABLE     5  CREATE TABLE public."TeamOrDirectors" (
    id integer NOT NULL,
    name text NOT NULL,
    "position" text NOT NULL,
    bio text NOT NULL,
    image text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 %   DROP TABLE public."TeamOrDirectors";
       public         heap    postgres    false    5            �            1259    35753    TeamOrDirectors_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TeamOrDirectors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."TeamOrDirectors_id_seq";
       public          postgres    false    227    5                       0    0    TeamOrDirectors_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."TeamOrDirectors_id_seq" OWNED BY public."TeamOrDirectors".id;
          public          postgres    false    226            �            1259    35784    VisionMission    TABLE       CREATE TABLE public."VisionMission" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 #   DROP TABLE public."VisionMission";
       public         heap    postgres    false    5            �            1259    35783    VisionMission_id_seq    SEQUENCE     �   CREATE SEQUENCE public."VisionMission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."VisionMission_id_seq";
       public          postgres    false    233    5                       0    0    VisionMission_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."VisionMission_id_seq" OWNED BY public."VisionMission".id;
          public          postgres    false    232            �            1259    35681    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    45269    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    45268    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    253    5                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    252            �           2604    35737    Certificates id    DEFAULT     v   ALTER TABLE ONLY public."Certificates" ALTER COLUMN id SET DEFAULT nextval('public."Certificates_id_seq"'::regclass);
 @   ALTER TABLE public."Certificates" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    64543 
   Clients id    DEFAULT     l   ALTER TABLE ONLY public."Clients" ALTER COLUMN id SET DEFAULT nextval('public."Clients_id_seq"'::regclass);
 ;   ALTER TABLE public."Clients" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    258            �           2604    35777    CompanyBackground id    DEFAULT     �   ALTER TABLE ONLY public."CompanyBackground" ALTER COLUMN id SET DEFAULT nextval('public."CompanyBackground_id_seq"'::regclass);
 E   ALTER TABLE public."CompanyBackground" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    40957    CoreValue id    DEFAULT     p   ALTER TABLE ONLY public."CoreValue" ALTER COLUMN id SET DEFAULT nextval('public."CoreValue_id_seq"'::regclass);
 =   ALTER TABLE public."CoreValue" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    249    249            �           2604    35727    Experiences id    DEFAULT     t   ALTER TABLE ONLY public."Experiences" ALTER COLUMN id SET DEFAULT nextval('public."Experiences_id_seq"'::regclass);
 ?   ALTER TABLE public."Experiences" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    36362    ExperiencesGenralInfo id    DEFAULT     �   ALTER TABLE ONLY public."ExperiencesGenralInfo" ALTER COLUMN id SET DEFAULT nextval('public."ExperiencesGenralInfo_id_seq"'::regclass);
 I   ALTER TABLE public."ExperiencesGenralInfo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    243    243            �           2604    65715    Faq id    DEFAULT     d   ALTER TABLE ONLY public."Faq" ALTER COLUMN id SET DEFAULT nextval('public."Faq_id_seq"'::regclass);
 7   ALTER TABLE public."Faq" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262    263            �           2604    36976    Font id    DEFAULT     f   ALTER TABLE ONLY public."Font" ALTER COLUMN id SET DEFAULT nextval('public."Font_id_seq"'::regclass);
 8   ALTER TABLE public."Font" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    245    245            �           2604    46956 	   Footer id    DEFAULT     j   ALTER TABLE ONLY public."Footer" ALTER COLUMN id SET DEFAULT nextval('public."Footer_id_seq"'::regclass);
 :   ALTER TABLE public."Footer" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    255    255            �           2604    35767    GeneralInfo id    DEFAULT     t   ALTER TABLE ONLY public."GeneralInfo" ALTER COLUMN id SET DEFAULT nextval('public."GeneralInfo_id_seq"'::regclass);
 ?   ALTER TABLE public."GeneralInfo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    37630    HeaderHome id    DEFAULT     r   ALTER TABLE ONLY public."HeaderHome" ALTER COLUMN id SET DEFAULT nextval('public."HeaderHome_id_seq"'::regclass);
 >   ALTER TABLE public."HeaderHome" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    247    247            �           2604    41715    HeaderPages id    DEFAULT     t   ALTER TABLE ONLY public."HeaderPages" ALTER COLUMN id SET DEFAULT nextval('public."HeaderPages_id_seq"'::regclass);
 ?   ALTER TABLE public."HeaderPages" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    251    251            �           2604    36352    HomeGeneralInfo id    DEFAULT     |   ALTER TABLE ONLY public."HomeGeneralInfo" ALTER COLUMN id SET DEFAULT nextval('public."HomeGeneralInfo_id_seq"'::regclass);
 C   ALTER TABLE public."HomeGeneralInfo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    241    241            �           2604    59548    InHouseProjects id    DEFAULT     |   ALTER TABLE ONLY public."InHouseProjects" ALTER COLUMN id SET DEFAULT nextval('public."InHouseProjects_id_seq"'::regclass);
 C   ALTER TABLE public."InHouseProjects" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    257    256    257            �           2604    35697    NewsEvents id    DEFAULT     r   ALTER TABLE ONLY public."NewsEvents" ALTER COLUMN id SET DEFAULT nextval('public."NewsEvents_id_seq"'::regclass);
 >   ALTER TABLE public."NewsEvents" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    35707    Partners id    DEFAULT     n   ALTER TABLE ONLY public."Partners" ALTER COLUMN id SET DEFAULT nextval('public."Partners_id_seq"'::regclass);
 <   ALTER TABLE public."Partners" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    35817    ProgressBar id    DEFAULT     t   ALTER TABLE ONLY public."ProgressBar" ALTER COLUMN id SET DEFAULT nextval('public."ProgressBar_id_seq"'::regclass);
 ?   ALTER TABLE public."ProgressBar" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    239    239            �           2604    64553 
   Project id    DEFAULT     l   ALTER TABLE ONLY public."Project" ALTER COLUMN id SET DEFAULT nextval('public."Project_id_seq"'::regclass);
 ;   ALTER TABLE public."Project" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    261    259            �           2604    35717    Services id    DEFAULT     n   ALTER TABLE ONLY public."Services" ALTER COLUMN id SET DEFAULT nextval('public."Services_id_seq"'::regclass);
 <   ALTER TABLE public."Services" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    35797    ServicesOne id    DEFAULT     t   ALTER TABLE ONLY public."ServicesOne" ALTER COLUMN id SET DEFAULT nextval('public."ServicesOne_id_seq"'::regclass);
 ?   ALTER TABLE public."ServicesOne" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    235    235            �           2604    35807    ServicesTwo id    DEFAULT     t   ALTER TABLE ONLY public."ServicesTwo" ALTER COLUMN id SET DEFAULT nextval('public."ServicesTwo_id_seq"'::regclass);
 ?   ALTER TABLE public."ServicesTwo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    237    237            �           2604    35757    TeamOrDirectors id    DEFAULT     |   ALTER TABLE ONLY public."TeamOrDirectors" ALTER COLUMN id SET DEFAULT nextval('public."TeamOrDirectors_id_seq"'::regclass);
 C   ALTER TABLE public."TeamOrDirectors" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    35787    VisionMission id    DEFAULT     x   ALTER TABLE ONLY public."VisionMission" ALTER COLUMN id SET DEFAULT nextval('public."VisionMission_id_seq"'::regclass);
 A   ALTER TABLE public."VisionMission" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    232    233            �           2604    45272    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    252    253    253            �          0    35734    Certificates 
   TABLE DATA           a   COPY public."Certificates" (id, title, description, image, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   ��       �          0    60470    Clients 
   TABLE DATA           n   COPY public."Clients" (name, logo, category, "projectNumber", date, "createdAt", "updatedAt", id) FROM stdin;
    public          postgres    false    258   ��       �          0    35774    CompanyBackground 
   TABLE DATA           h   COPY public."CompanyBackground" (id, title, description, "Image", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    231   ��       �          0    40954 	   CoreValue 
   TABLE DATA           S   COPY public."CoreValue" (id, title, present, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    249   ��       �          0    35724    Experiences 
   TABLE DATA           e   COPY public."Experiences" (id, title, description, logo, date, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    223    �       �          0    36359    ExperiencesGenralInfo 
   TABLE DATA           c   COPY public."ExperiencesGenralInfo" (id, title, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    243   '�       �          0    65712    Faq 
   TABLE DATA           P   COPY public."Faq" (id, question, answers, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    263   ��       �          0    36973    Font 
   TABLE DATA           K   COPY public."Font" (id, title, font, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    245   �       �          0    46953    Footer 
   TABLE DATA           �   COPY public."Footer" (id, address, description, copyright, location, email, phone, "workingHourse", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    255   ��       �          0    35764    GeneralInfo 
   TABLE DATA           X   COPY public."GeneralInfo" (id, title, key, value, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    229   ��       �          0    37627 
   HeaderHome 
   TABLE DATA           h   COPY public."HeaderHome" (id, title, description, image, opacity, "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    247   ��       �          0    41712    HeaderPages 
   TABLE DATA           \   COPY public."HeaderPages" (id, title, image, opacity, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    251   ��       �          0    36349    HomeGeneralInfo 
   TABLE DATA           �   COPY public."HomeGeneralInfo" (id, title1, title2, content, image1, image2, "createdAt", "updatedAt", height, width) FROM stdin;
    public          postgres    false    241   0�       �          0    59545    InHouseProjects 
   TABLE DATA           x   COPY public."InHouseProjects" (id, title, description, ldescription, image, date, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    257   Z�       �          0    35694 
   NewsEvents 
   TABLE DATA           �   COPY public."NewsEvents" (id, title, description, short_description, date, image, "createdAt", "updatedAt", extra_images) FROM stdin;
    public          postgres    false    217   ��       �          0    35704    Partners 
   TABLE DATA           N   COPY public."Partners" (id, name, logo, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   r      �          0    35814    ProgressBar 
   TABLE DATA           U   COPY public."ProgressBar" (id, title, present, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    239   J      �          0    61432    Project 
   TABLE DATA           g   COPY public."Project" (title, date, description, "createdAt", "updatedAt", id, "clientId") FROM stdin;
    public          postgres    false    259   �      �          0    35714    Services 
   TABLE DATA           �   COPY public."Services" (id, title, image, "createdAt", "updatedAt", description, "hsDescription", image2, image3, "lDescription") FROM stdin;
    public          postgres    false    221   >      �          0    35794    ServicesOne 
   TABLE DATA           _   COPY public."ServicesOne" (id, title, description, icon, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    235    2      �          0    35804    ServicesTwo 
   TABLE DATA           j   COPY public."ServicesTwo" (id, title, description, reference, icon, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    237   6      �          0    35754    TeamOrDirectors 
   TABLE DATA           g   COPY public."TeamOrDirectors" (id, name, "position", bio, image, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    227   .:      �          0    35784    VisionMission 
   TABLE DATA           [   COPY public."VisionMission" (id, title, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    233   �@      �          0    35681    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �I      �          0    45269    users 
   TABLE DATA           X   COPY public.users (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    253   WR                 0    0    Certificates_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Certificates_id_seq"', 6, true);
          public          postgres    false    224                       0    0    Clients_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Clients_id_seq"', 14, true);
          public          postgres    false    260                       0    0    CompanyBackground_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."CompanyBackground_id_seq"', 1, true);
          public          postgres    false    230                       0    0    CoreValue_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."CoreValue_id_seq"', 3, true);
          public          postgres    false    248                       0    0    ExperiencesGenralInfo_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."ExperiencesGenralInfo_id_seq"', 2, true);
          public          postgres    false    242                       0    0    Experiences_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Experiences_id_seq"', 8, true);
          public          postgres    false    222                       0    0 
   Faq_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public."Faq_id_seq"', 5, true);
          public          postgres    false    262                       0    0    Font_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Font_id_seq"', 2, true);
          public          postgres    false    244                       0    0    Footer_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Footer_id_seq"', 1, true);
          public          postgres    false    254                       0    0    GeneralInfo_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."GeneralInfo_id_seq"', 1, false);
          public          postgres    false    228                       0    0    HeaderHome_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."HeaderHome_id_seq"', 5, true);
          public          postgres    false    246                       0    0    HeaderPages_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."HeaderPages_id_seq"', 1, true);
          public          postgres    false    250                       0    0    HomeGeneralInfo_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."HomeGeneralInfo_id_seq"', 3, true);
          public          postgres    false    240                       0    0    InHouseProjects_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."InHouseProjects_id_seq"', 5, true);
          public          postgres    false    256                       0    0    NewsEvents_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."NewsEvents_id_seq"', 10, true);
          public          postgres    false    216                       0    0    Partners_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Partners_id_seq"', 61, true);
          public          postgres    false    218                       0    0    ProgressBar_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."ProgressBar_id_seq"', 5, true);
          public          postgres    false    238                       0    0    Project_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Project_id_seq"', 24, true);
          public          postgres    false    261                        0    0    ServicesOne_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."ServicesOne_id_seq"', 8, true);
          public          postgres    false    234            !           0    0    ServicesTwo_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."ServicesTwo_id_seq"', 6, true);
          public          postgres    false    236            "           0    0    Services_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Services_id_seq"', 11, true);
          public          postgres    false    220            #           0    0    TeamOrDirectors_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."TeamOrDirectors_id_seq"', 6, true);
          public          postgres    false    226            $           0    0    VisionMission_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."VisionMission_id_seq"', 164, true);
          public          postgres    false    232            %           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public          postgres    false    252                       2606    35742    Certificates Certificates_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Certificates"
    ADD CONSTRAINT "Certificates_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Certificates" DROP CONSTRAINT "Certificates_pkey";
       public            postgres    false    225            (           2606    64545    Clients Clients_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Clients" DROP CONSTRAINT "Clients_pkey";
       public            postgres    false    258            
           2606    35782 (   CompanyBackground CompanyBackground_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."CompanyBackground"
    ADD CONSTRAINT "CompanyBackground_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."CompanyBackground" DROP CONSTRAINT "CompanyBackground_pkey";
       public            postgres    false    231                       2606    40962    CoreValue CoreValue_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."CoreValue"
    ADD CONSTRAINT "CoreValue_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."CoreValue" DROP CONSTRAINT "CoreValue_pkey";
       public            postgres    false    249                       2606    36367 0   ExperiencesGenralInfo ExperiencesGenralInfo_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public."ExperiencesGenralInfo"
    ADD CONSTRAINT "ExperiencesGenralInfo_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public."ExperiencesGenralInfo" DROP CONSTRAINT "ExperiencesGenralInfo_pkey";
       public            postgres    false    243                       2606    35732    Experiences Experiences_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Experiences"
    ADD CONSTRAINT "Experiences_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Experiences" DROP CONSTRAINT "Experiences_pkey";
       public            postgres    false    223            ,           2606    65720    Faq Faq_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."Faq"
    ADD CONSTRAINT "Faq_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."Faq" DROP CONSTRAINT "Faq_pkey";
       public            postgres    false    263                       2606    36981    Font Font_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Font"
    ADD CONSTRAINT "Font_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Font" DROP CONSTRAINT "Font_pkey";
       public            postgres    false    245            $           2606    46961    Footer Footer_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Footer"
    ADD CONSTRAINT "Footer_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Footer" DROP CONSTRAINT "Footer_pkey";
       public            postgres    false    255                       2606    35772    GeneralInfo GeneralInfo_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."GeneralInfo"
    ADD CONSTRAINT "GeneralInfo_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."GeneralInfo" DROP CONSTRAINT "GeneralInfo_pkey";
       public            postgres    false    229                       2606    37634    HeaderHome HeaderHome_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."HeaderHome"
    ADD CONSTRAINT "HeaderHome_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."HeaderHome" DROP CONSTRAINT "HeaderHome_pkey";
       public            postgres    false    247                       2606    41720    HeaderPages HeaderPages_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."HeaderPages"
    ADD CONSTRAINT "HeaderPages_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."HeaderPages" DROP CONSTRAINT "HeaderPages_pkey";
       public            postgres    false    251                       2606    36357 $   HomeGeneralInfo HomeGeneralInfo_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."HomeGeneralInfo"
    ADD CONSTRAINT "HomeGeneralInfo_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."HomeGeneralInfo" DROP CONSTRAINT "HomeGeneralInfo_pkey";
       public            postgres    false    241            &           2606    59553 $   InHouseProjects InHouseProjects_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."InHouseProjects"
    ADD CONSTRAINT "InHouseProjects_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."InHouseProjects" DROP CONSTRAINT "InHouseProjects_pkey";
       public            postgres    false    257            �           2606    35702    NewsEvents NewsEvents_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."NewsEvents"
    ADD CONSTRAINT "NewsEvents_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."NewsEvents" DROP CONSTRAINT "NewsEvents_pkey";
       public            postgres    false    217            �           2606    35712    Partners Partners_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Partners"
    ADD CONSTRAINT "Partners_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Partners" DROP CONSTRAINT "Partners_pkey";
       public            postgres    false    219                       2606    35822    ProgressBar ProgressBar_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."ProgressBar"
    ADD CONSTRAINT "ProgressBar_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."ProgressBar" DROP CONSTRAINT "ProgressBar_pkey";
       public            postgres    false    239            *           2606    64555    Project Project_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Project_pkey";
       public            postgres    false    259                       2606    35802    ServicesOne ServicesOne_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."ServicesOne"
    ADD CONSTRAINT "ServicesOne_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."ServicesOne" DROP CONSTRAINT "ServicesOne_pkey";
       public            postgres    false    235                       2606    35812    ServicesTwo ServicesTwo_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."ServicesTwo"
    ADD CONSTRAINT "ServicesTwo_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."ServicesTwo" DROP CONSTRAINT "ServicesTwo_pkey";
       public            postgres    false    237                        2606    35722    Services Services_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Services" DROP CONSTRAINT "Services_pkey";
       public            postgres    false    221                       2606    35762 $   TeamOrDirectors TeamOrDirectors_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."TeamOrDirectors"
    ADD CONSTRAINT "TeamOrDirectors_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."TeamOrDirectors" DROP CONSTRAINT "TeamOrDirectors_pkey";
       public            postgres    false    227                       2606    35792     VisionMission VisionMission_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."VisionMission"
    ADD CONSTRAINT "VisionMission_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."VisionMission" DROP CONSTRAINT "VisionMission_pkey";
       public            postgres    false    233            �           2606    35689 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            !           2606    45277    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    253                       1259    45279    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            postgres    false    253            "           1259    45278    users_username_key    INDEX     O   CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);
 &   DROP INDEX public.users_username_key;
       public            postgres    false    253            -           2606    64562    Project Project_clientId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Project_clientId_fkey";
       public          postgres    false    259    4904    258            �   �  x���]n�8ǟ�S��R$E}�)NҨ�e��.`_F��)U�ۺO�F��r9I)��:�� ΐ3��q�l�e�W�mr�,����!I��z����*�M���[���8��mw���tu�,ɶWKH���8d���ԁ��KgܬM�tm��Jh�;�Gp�an�= ���l�P4��љ�9�u�e��Jz�Ix9�P$�P���'�=�C{7c�	BC� D�E�:�����G{(��ϲ�RX����ɕ�����#]��?3�p���/ ��y��	;K�ء��x�Ѓ��ٳI���:����1J�����*�&W��fy2J�	:�c^�L�7Dx�姄�e%sz��w����"�eb.f��ZE��n0��w����(γ�)h*��X�o��Q�k4-�Ȏ���S���6�xJ���K�}���[�'*s�EO��0�D�	
������2�B�5/T���d���RB9L�H��b�����s��+"����d�]����z���hJ��8g��X������k��n�WO5����q�:�ߘ��{*cr^뾰�ov�K�i���'9����bD�����H�@a�!ͱ���v�O�/�Y�2�so�\��S�Sɯ��=�*�;���:^b�J�rR�����6Fcm�}B�z�+3�C�����)lh���g�MQm����nL�#,�R�s�*nq��"X1F�B�Ezae�����g�}���D�9L���|>�S���      �   �  x�}�K��0��ɯ������ޙ�7�VSu*��A@G�_��J�(��>���\/k��ν[8��E=-��C���������js~Xs��N��$`�b�%�n$@���]�ߣ��y{:��.������%��� �v�a��0D��J�4!��4U��R��2�J������h���	2��Рy3�Q�.���V�m�3�	�� M2���z�p�KI[�C`P��L���0ՄL�xy��6���!��<z�_��1�R�fBx72J�NS��H��zu �=�[S"�fa��h4�s� 2���1;�W���7k�b�ޜj�]ܧĹ��#[箶v��<���LI�H��x#`m*܍;��S�dB�Ձ�Ų�-���dj	�����Q�W�z�AIS"�o)��[� MH"������V#���f��D�t�0�wͥ B����w�����܇ ���c.5�h0��$��?N��"      �   �  x�u�Mn�H���)�ΐIV��wN&h3� ���7M�H����G2}��%'˫nJ��a�?U�^}U��ŧ��ggk�����J\_�]/� >�����܃��FSQ%����f&v_v����_�e��:/
j�*x�h�34��S{Hhթ��u�u2(k"�R��`�E+�T��\R�OH-v_�g%%!����:�-�HEhI���I�g�@��{�,��-@�'�� �J��8S�� (��\e�n&��1������Pޡ��L`��Qk2%���T�,i,��<.�Z�|j�GHRAg����A�#X�1'�� GWF��8��ݫTC��<(T1�T:��^:Ea���
���/�����ѴҔ�}�І��:Rn�}�Z��eDBxh%tR��m3共A<"r���>: ]��q�YNq̵�\֢ٝYxP��ɲ�y՘�%�ĵW��U�U�B����B��s/T�N�6K��BC;�����7���!������h� �QX︯0;�B�Q�$�޳\T���R�N�<jP�-�Տ�;�T$Ϻ���{"����F�B���펪>>�2�6���$;у�����U���FF	S]�k�<�X΄hI�Ж�u&jed� ����HMUY������0��L�$r[�I=Ee+y���GM��8��ST���*�!�8�x�8T�g;dZ�Q��dZ�Au���pjo��ZIL�Aa(O�NB��~��6�?Qj��t�N��7��R�"����ۥ5 0�Fdl9Grk�����˅#^|����]��<G�:�{ԅƂ�ܧd�9��U��]�������H�}��r/��	�s�zQM����Q��~>J8C��6�N�=ߙ̩cv+Q�t��^�` ө7;�U�aT���)���c�%�s��D��%��)�V<V*ը�}��З��.�'�I ˺ώ��{�t�&�_���I�E��6�80�Le�gfVeg��y5�S�"]����絇CVL�m�a�G�ti��w��F
2C'pfiO'@P�O�2��e�WV��f�}�"�3��3���o�1g�V�?����+�s�c!%��`��-�3>wLdNت�O6�jm��M{�~O?����>��pd��:ee��,��W�j;_U[9�l��sYU���b�,jڔ����c�\����|�n�Z���n���lo�[��v�\�����fs��c����|X\^^��ik�      �   �   x�]�;
1 �:9�\`Cf&���mD�l?K l�%�Ƴx2�W<4��^aw��p.�X���2���0�֐���ؐO�A%:��s�}��TjI�l�]��q4�)�9|=i��T�3Qb�|�'cEV	�ؓ�־�(!      �   �  x��W�v���_Q˃\{-!��%���E���u�֝!�iK�����2���|ɭs@�ݹIg ��󨪽kWAk�i�U`hN����_h7k�7ov���Hw'�Tur���V@�U�$��(���^��	�d#H�(��[g�dAqH�H�8�p�Uǲ���u�.�*���(�EI�ȁ�ɏ�ǯ�I�9���鈯k��4��$�la�S�r���\�'TEZ7��9dGk
q�������1�Hx�o0+l���_ZVC p(�������SRv���h٦,�EE���gۺg[k~�'�?���ATq�ح�Uϸ(�����Ϋ#�b��"��U<$lo抵;�<Jx8N����Fs�hc]�t�Q��n$���h0>��Uc]��"Mt!ݥ��h�(�-�"�tBb}�dt�l;A��X��$Di��S��dc�=�Eթ:�*�h2Q�������BH�'$Ŋ~��݇Y˷"�"�3H/	��{�'��_�Δ�-Ǜ�����-!\���ќ?X��	s�}��7w��`�ְ��-����<�JC%�����$5�I�uC"����L��]�f�xl�GY��t��f��d��2~v��2�Ž�k�͝o.,0���`�~ A��x~Ȭ��ƅ�j3`��.��0d�,�ڨU��_1��,��7̽7��be��8���o����F?�??��iY@j���Vj�LT�!M�6��AV`߹C�a����8�!�V����Y�� ��|���ܭ�&�\�l4�Yن�[~�b�{닛:�^�id�9xBkݹ�٩1�svj�;���rIPMU'�]�")��kD����w�4��Xi�H,�įԘ��H4��5��<"�z%f����1׽*��:��3�՞.� .�{��´�ʀj����h��{��c'��v�� �/&�d��u�+�iqpL�g2"�"a��pųp��b9N��p3�׳!;\7��<��2ra�|l,T�<��E)qH�l3�_Y�w4澽ap���xː����؋Ƌ�`�Y|���_���-#�,6��N �bb��k�ÈS=&��)&�$�'��ʚ��;)I�DKa�Z�U	��_1@��+���	����<������䑖�ў~A6�)��g2L_Kl����ź�
��ﳃ?H�]��?����{��E���C �$\Y��5HǞ����$��E�-����7Z��o������&2��EE��^+�+;J��i���u��Ɍ`�r�j%��1wi�E~�"��`qI;K]gh#qܸW������5�.�i����DP�[EKQI�����i�� �2V���H֤��LF��^)�(ϰ嫲:�0y΋}����[�l�/ؓU�X��L�
��~�P1�^��\��Q����؟v�	�<{/l�v�:4��>o�=��]c�o� ���뗏wY�&1��k��9�զ�:���a��3bl�	˷���\�[$g����|��Y�\�u*vh#->�����M�L�Q~��~�K�RZ����2�ګF���Ϗfo�s�}�F�����=��{ʻwl��{l4�6�_�7����@o��k��	 �k�:�bx���b ��+�b|p��
\�ˬ��+߲���s��zخY�!��.
ێf��)����l���=�x����؛Y���y��5���ۡv�TTԶ;I��1E�C0R9oei��t��T���J�[�ҦDB��5WD�)��-~��n\�gtuu�?�k~�      �   Q  x�eSMo�@=�_1�	�� �p#%UPA��K/{lo��u�JO�9�]�%}�{Iz���3oޛ����5�tAYC��/X��ϯ��p��*���HK�u:Љϓ��
��	�ȓ�R
.œ�H~t┠��V��b�],���샴�������s�:�Be��	]ض���9�"E��$P��F�d��9��BlJ*��g�UP�'t@�<%z�Ǥʀ��LM>�x_E��Բ�LL�:
�ɱ�%�X�I䀈Q+>� �=
���pTht��Fi������[Ns���� �!-�{� �L�c�!o��+YW�Q?{`�����5���Ή)���W�����ћ�m�U��y>.7���e,.�?ݿc����<��$�a�B$-��=��ӚS�I[q�-Y�=�(̚��5\�p��C�.�s���v�&Xq��i�ۭ���.�"�i�j�zP�xXl�i�zW��ؼ�K�l��c!�a'�F0A��q�6r���7��U�l�w�9�/���x�x��6vd{S&�c.9�i$�`@w�y�,@nr�g�t���79�����v:�~���7�8���v���y6��>�M��_8gL      �   �  x�}��n�0�g�)�u�>�$��ҡ�;�0m3�%C�θ>})_�h��a��}?���'��B	� �♍�۠�������l�T=�(BD?ҟ�qٲ!�AV�����2���2敌��G���[09I��'Yxɉ=��\>� ��'.!G�D65U�v�]������>�Cs���uW}��� w	�vS^��T}/B+�!�E��8VdH(�4�nÿ&bɲAQη[oF�B���tU�|��L:6xa����wu}��/��c�o����z�W_�
=<�H�,��2}�)�#��o</���d��b���d��Ģ�@��{+!�u�s0�����,v�9��u�����-����>��}��V����u�3��D      �   c   x�uȱ� ��p���é���Bb�&���j:�z��Zj��u{vՖ�Z 	ғ� �99��W��!����bj-
O��cD7zg:����h�_:�W      �   #  x�MRKs�0>�_��^j<2��SMI&te����^6�b��#ɦί�$Mo�>���F�b����'O��ͮ�b����&�5����a"�4��F�����j� ��ߦ��@��=z%��3Bilk,zi40�,1T�ዒ=Y�k�?%�al���eI��+pFu��������g]0ZÅ������g%]�,ɑ�HP����*�m�+W鍍�Rij-_x�hlXg�g�p&�ܠQ)�%ż�M�_5�J�)�%w�24X-C��%I͠�5߼:�J6Ǫ,���)i�/���[Z!8n�������v�%��ȩ�& B�V��Yc��|uI4�l�D�b��6��,1:�V|D�+�n�U(�S�M�ق7f�Eke�����
�αK�p@{�!l,�;*��2���	9��Nn �4��T(l�ϡ�+5�A�)�i\��������&M�W�n%�7��є�煘�|�� e�蟤��2�]� c���|ɦ�]�v���5��X�9-���<�/��j�ZO�X� &\��2Y.'�_�h4�CP�      �      x������ � �      �   �  x�ݓ���0�g�)8u:��_��n�-Х�"Q� �2,����+'�rA_  }�G�?P����V�����	=�˒q�0�-#Z�������	��dtkZ^`A��)�-֐��.��q=��eJ�]c��N��D.J��zߊ+_Jq*u�%}�'��%� {�}t�B�lIm��Z�M����2�����ZԲ#���Dr�I��'N��1����b�\�	�@Y/�^���b�e���=S=���;~d���̑���c68�!�Zˈ�˩&FX9����N�;�?���[�v�������K�<�|;������ؒ�]j�Tka��gV�g�1��]�U���R�Q>>��7�|K�ъHF�N�GkL�1X�����I|Xͻ^�j���ޞu      �   �   x�]�;� @�V� ����ڱ�yJq� q�&�ݝ3W�KJy�6�k����*	������۔Z_s�$M_R���;��|XB�Hn%��}����^�/�x�@�T{=��֎`$�R��wY��Hr�)?S)��Ns�O���ύvB2#�3����7
      �     x�m�Mo�0�s�W̍K���qnPzC��
��c�w�B���m��q��n���'��̈��>���.��pi��r��� ���SZ������\��)����:2ˈ��!�)E��$a�2#�Вb{��޻.RJ����� �p�ĉ\d���rI�%\�z&zf[-�v��q����UL6����tǛ���RʸE�}<�R���3�p�f�[�\��!�4�j���)- �i-c����N��:�9Mi�tn��OB��4z�Pp:>kg���=bh_�[�| RSOd�8qJ�u�m�ȴi��BKijcT�t�Y"�����&�Z9����UkSa��=-7Z��)�i��M�c���
_c����l1�{�}�8M8{��~I5��Q7��Nc�w����'W{�B,n�蟙��֩�z���oX{H�w}<�8�������m���|��u�wHLЂ��-q^j���"H�4������l��m*Ɠ�sF,7B`�T��f+o]F�z)�N�^Z�����J���x����/��      �   b  x�]SKo�0>�_1�ݨ��MB�e����V�K/�0�M��������a���<��^ñ�������ѳ�ɵƎz�����[��iޞ����(�O4Ae�o����x���1 ���lM��^������Mt�̃��ݧi�'ĝP�(�R�
��(
�d�Ke���u�4K3�>Q�d�H2�(H�R�2�ǅ��?W%��j#���#�]V^@;0��z��	j:�i0�oF��L��K~��8O#4�t7QĲ��'ZE�k�zef�k��#��?�"l��9�m�a�e3|C�q�z����Au��y��%��{�g�X��en8����h&���bw��w3� (�_y�bx���1���yj�yy�qlu��t��ۿ͟��-9��p��k�Զ��k�}"˼=B`HT�\}ax���Xq�R�?b ��n��5�͕��H�m\w����[�mD�W�M����0�=�q=�<��FW�7?c�n�܂�z7�Z�%���p�o���&��:.�v�qb/ߘ�i`]�:!�`�G�j_5�j�/�b��!U��\UBU�N`�D���,���pX��i"d�9�d�T�2-b���"ٕr+)7/�f��UQT�      �   �  x��Y˒�Fv]7�"��LG����we���
�����
$�,��5%�D����q���������fS�,f!�@f����,��ׇ����uk����G��⯞wjj�ɏ���0�o��wo폿g���u�w�#^�c�>L{=��;����[���Ps���~t'�&��2���{���7G��{ױ����¢l��0N��w�ٹ;��v��g�zm_K��Vw#�I$��M�$k�1�W���?�~��_��$9����`�N��Z��o35�n�=�@K��5t�����N������F(�ж׍{5���U4�p�]U��N�k=����?w��4��Z�e�޶v�L�G���r�S�{y�9s�t� �7�F��Xz�%W���g�7�-��5�-.{�f�b�h9zM?����m��9�r���0���N��gޫ;��N�1�&9�\���wR/�|���꠯F���(������?���u�0٠�vP�N��3���pQ���TOKq�6�8+�G����#�$o�<�5�����$��]{=�`��Kk,�8)�3��;�\�����HD؞N���&���tj.�c������.d!E�yx?���mG�v�����4�h�T�"q�$(�%�FP�qL���O
φ˺�G�,�c�XǛ��!6�1�	�k8��`���d�77/ڐ�H��*�?�JJ1��#��dQG_��pi�m���8o��������cM�M-k~�)|���K�U'�Q7�gd�M".~���n�\�����yb:
g�a�nK/���y��u��0R�Q��'�Ö���/Wv���˿=\^��_G�;B� ̂(��z:5����0�a^dq �����IP�Y�ʈ8J+�G����Ga&,���!N�i}���]��S��,�72R����8�q�&�<v�i�eYT�A�Y��I�WAVʬ�T��$߮�Z�iB�FAjT<�A�Y�!�(�+U�Ċ"7:Hc���0HuQ(��,��z���\���ߢ�b�䎒�ٷg�e;W~��
��Y u����8d`� oz����9x��ec��P+}���i�l���C�Ֆ�)����8�$���@%�(
#"-DBx9H~R���P0��!�T.]9X!*7fI��!ClK�~j����� ���q�A�v��	Hi���IC�Ax���I~ԍڑ�������T]������#��a���6�:�4��}��;5Z�
$�3�@���B�B��b+(c -���Ρ��4N��arud��=��u�v[;��:x����g�!ŹicD��m�=��F�bC��<�|/��nU9{��ΣW%���H��Ba���/U�"{k�il�х�|��'��A������gg�UD�i����R;HK��7H+D�\jD� �	�a\�y"�)�o���|Ӈ,�ٗ� �T�.b�s� �d� 2Y*�4,�Do�F��d� �2�$V�0JU�*�)��	<�B���AT�8C��Py��0I妌�+�\WE�f��+ЌT T(��ҡ�.M�-]��[�%W0[c�Ğq���q-$G3c�8<ű/o���"�F��W%�5*~�?���^��Q��W(� m��߱������{xlf�q�P#f����*��|ހ�-?�pVȉ�'X������8؏����t4�� 6���$�q<Z���h=����k1Ͳ^��w��7Y����D�c�wr��)V��>�kg����@���p�g�ࡉ�:��+�����>�G�������&V�<����X�Z��w� ��e��������(( 5 ��Cj=q��_���	Ζ(a*���H�t�Zx�E]�^���Byk]A�/���X���$l6/$~����%	Ϡ_�B>�y@E������`5���D���%d��+7[2d;��T�(�k��?ܳ����Dv�y����Q��`�Й�ӫ�@�$�n�j+�-n �%��tT��Šg���UD�,�e��3����!���tO6 �+�|��,��*8�����ሌ�İ* \W�r�oA઄�A�h��Is``�^�q���,)��0@^� �:�
A*P�BW��O@�T���y�Bl��8m�(����J��!���D��"��f�HQ9D&�PKY�U�A��{C�ur�w�1�������j��s^8~���������h���6
��&�/���*I`���?�[�2�D��'�E`����=oZ���X{�@�O���i��G~�_("�7���'2ܢ�J�i���n(|�K����	:kfe3�Q��e��[�i�D {<� �][V�G|�fzma��Tp�����inG!:�pNB!7<�y����5*��=a�t�!�y�^����og%i0��m��
�l�1~E:���ν$	)ȶ�7J�k �q�'Z��h6�2���Rk�\ܕ7!�
a�w̓���b�\/��#7-�>U.=<��y�F��u��G@#1�387���e�nRmg{Ƕi��T�):�zb��M��E��޷s����^Tu��4���ڣ�:�3������Op��Z�j2@_� w�:�\�s�!~���&5q6ILc,�n����G>�H��Еz�]M��{�L��m0��$����aF}3�[u�o%+�QW�`�¤D��(�<f�IR��3c�,z��}T_|~+YQ����$�AZ(E��"�8E���#�(։�QrZ��,ॉ�s)�,�4�Z���J-�(YY&�"��A����h�"̪�d��� �Q��P��J�Q�4)��(�L�Q

C%+G%�(	2�D"Q�B÷+��HLf�o��Bו$A)#乊�DĹL��
�I�h�L\�T�
D��A�J���
��V耸�SHg�8�AYV1~��n΁zQ�m!��qh������w3���#���ٕs>��z�A�L
������O���m<��j~�W�~ ���	!_f�3bЎ�6�J}�jٗ�Dab�nK;k�V X4�Q~�>����nM���{6#��N{�\H�#��4m�/��B'׳h���� Ȧ�"t5�����ٿ�©;C<?�������_.8�����
K�z��e���@E_�.G�> �k���|~_�d3����_�C8tP*w���������D���L#�v���b�v�A�8��<������t7 �*��C�m�΁�^�θ`��]?�Z*<7R晿��+�vy��* %�p\�q���\}	.��r����Y�-��W� �R���͋��R!#]��ʷ�B���!��b_��r>�W,,�y��z+�M2�"��R�q�U��xX�#!���|5�x����@��)��dw�Ro�uT��+��{��ܥiG�y;ǥ��e�2�.A���D��֎M�.Knh���ٳ�D#cȹ�,uLt={�^�0�#՞����������/�h�:s"��e�炓0�nǞM��bL�&|�ڀ�]g N��v1�d�|�]���Y{�i,v���x���ZM���:~,��v�h�^Mo��J7p}	j�܌��\��s�\$���|�&@��I8�;F��dR�yL�]!~N83n��o������|p��b�!󊮟ݿN��"���#�D��)�R�~�i>� �b_/��O"�ͳto�[̀�� �W�3S�ǵ��5�_z�+����]�ݜ�j=���j���W4*�Eޟ�lǾ�>�#��n&U4M�Mp���4"�a�V�0y��hX��yP! �L�Qe��2��0(����⒅�CE�zX���$A���dl��ϕ,��j�f*UT`Si��<�+LP	�.&e�0n�/�T���c�c�KJH��R��<�q�HE
P8�-�R�*�2��ϊ2��0|�+��U^rlZ����aNP�B���LT�c������]��      �   �  x�u�[n%�E�K��TW|�A�%?z����v������}lє6�c����S��Ƚ'.����y5Y��&>I�F�{<���?�����>�NU{�;
��l��.���^i%_��~Tn}����>���
���!�aH�o����+[����|&��!�����t�I:eKO^+_F��q#F���.�t2�w�#9���"��z�C�&oܦ'�ap��i���s��&�tGz��e"j>摽�_�t�����%i�}6��7a>uG�(�a,(���3��u�����SM�e�ɵ��H<��߲�t�w���S-*�<�����hj+샨�����(p�W�d37�۬~��7���l�XR}sg1��i4�GgF6�[u�ֺ����F�rAu��L�[Q����<��;��n�ik�S�E,0��Y���K���.���������yJ둦�.��	d���!5�8ȶ>�C䴧	^��pЍ�b�݂��5Y��#�=�F��8\P�{��$!�?�n h:J�Z� Gq�h��a��"�!�]�-g�G�t�rЍyI�Y�/�T��<�����0c»n|��g�G>/ݱtC�Xê,�,f�[^�3�q�J�s{o���Ԙ���A7�WN^
nK��S�f�U5U[�-��t���;N�ps
._SC����.���\�d�ǉ��B�t�W��q���O9^>��b�UNEz�ɼ�x�}x��-;F���`���@�I-NC��@0�uf^����|�򸵗��h#ۜ��(�Q��Q\(�:��8��A�Kz��;�Lp��<R�1Q���=2�Vr&�4ʺ�N����&�O�	n�F���$���C���}	}��F���ܶ��!z
=��Kw �h�f	��>��������1aekV���p�w���ō�/q�|���*
��"$HEQC������ۧ���h�Q�Te�(L����b �i��)���|�<Kz���;Aø�@�.1 'U�Tg1�d-ϖLPT���!�Wodw}rc�����OƤ�X �V��6{߳��i����$rc�F����I���^um�>�i�Vݱ _��^�ҝ�Cn4虫Vx�m!�9�QA��M�&��w���;�Un4hF:��RL��0X���`�ޑT�a��k����t��J� �<-Ԍ��0�H��:dq���)��ⳗ�t�Xn4�mC�?�5� q���g�n@��m7��Az����ҝ�!7�:�
:���0�[���Aw)=nG�r�����o٩r�L�*:�C6r��FP�,4�m��N�5>?:�o٩r#�l0���{�<00Ta�[~a�^��vn+��� �-;���8 X���G�%%� �y̦}4t��>
�2��w��t��_�P�GYUQ9Ҫ7̢��e���Y�q�j��逗�4z'���XE.�\��+J�Vm�� �]�������^��r�dBA���f$�8�c^l���>,j1=���;��7�N]�U�w�0�Z!�a`!ƊB�M)���/��p���~U�>�_�����9���i:ӳ�t��	j2���VvT��"�4�Rf-)dK�8[��}>u���\�cӅu*�U�Û��Մ�HKXkW�>8`)��/�a�����Wm�D|��|�@�l��v�M�8O��?�Kv`����0�����o�HC��_2f�ݎp���~"�Kwh}z���pMM�3c!Qm���uL�
$N��!�k��O|�.�Co4(� 		�`m�����XSm�pљ�g����_e�3y��W`}�]pW��^k�up��?�����;�C���H��X{�kDX#�kOO�8<�=�0n�R#�V�Q�M�f]�p7�VF���v�;λfڟ(x�.�#���.1kG��E'�E�Ό�*��ij��!�d~�.�oHVj_��ui\�g�8w��%��q���{6�Y��������]|�      �   �   x�u̽
�0@�9y�������!ي>����Ā��@��ե��q8��b�kR�9�қ`<B��a$�.h���ٝ��H,y����x��t_s�K�׈���#���J#�K}�؛:Ւ^��d�5�7�����N�/�      �   M  x��W�r��=�_��������!�X�C���	,0 P2o�>9��s�%�U ��i�sp�����2�2�cN�:�	�)�[�g����l�׈JԎ��YyL��n��aGsX�IBӌl�q�=)XF��l8Lw(R`|��0x����)� ����!d�<M�m+�ס�����	Y�w�. �������ᐜb�mÆ%b��IR�_X��3�x.��Ŏ]�=���A���K���e��3 ��br�1�3�}���ܧ���ĉې(�b��,�%Z-�#��*d�j	nZ--���[�f��*ꠣ�EU�S'w�~WUǟ�Q�I=�Q�=��L���GĐTs��F>�1t] ��:mQ�JI��eo%���Y�L?e4/��@*pr��;���,��	�e�؎�w;K�wa�ℌ����Ԇ��5����oS�$�fL
S:M�|�\,��+�&���f���?�S��^GL�Ђ>
!�4����j�3H��E��d� �9y��bZOp��)(j��HӰ�j�I��H}/���)
���N�ڸn�~>kM�FGuȰ6�ݙ�,M��#�3��6��C�y8d���t�DN-1�~�� ��c�������W�;��Q��k _U]��G ����(�YA�-�bE.@j^���"���N�f�u���q�`�\���~pHh���2 ��e�)��rXф�����T+����?�����;m�LF��ɠF�����u�`�z`9s<s&�h��'�y�Y�e.+c�[:�y0s��n����/�=O��3��E-�}&�%�	&4�'2o�$���6 xZ��4}Ρa!�	ă!�`>jt����ц�|
���o@T|�E�=��5�טo��p�E�g����+�2ʋS�5�Bh������I���i�\�j�H"�n���x~L
�,"�&"]*�Zy���ô�/��O���m��:m� D1���je��T`�����Lp�q޽��498r�Y��������霅M���p�
u$�a*��d�!��c�{C�� zh��`�~ �\'\�]�?���]US?��V��:�[���uðĳn�W�_�٤� Ej�'C�qcX��U�M0�Y��t �������,1mW~�]�Wl؈q<��i�L��vC菆�$|��a4A�F�Bp�.�IH@19����΁Ud���4,�]n��׾n��Kk����i٨�n��S��6�ǌ:�ccތl0�����߆XsGeY����oM!�ڛT�d�V��Y.q�ׅGZa$!FS��`�tk	�)��@��Ef��h�B��i^I_Fx-���ȇ�o.u����r�&t�IL$'�_B��gK}nv���*��Ȱ迡\������'8��oO* �~X�����|���c�q�@���b���@��2�)��T���T��¸��{��F?��\�� 2��#�;E����܎�F�|oJ5�g�"�t�H����%tk�oWlmR��k������؈�v�P�vcS�&����w� ��s3�N�*���s�Y����T^&`t�z�4�}�l��1��3���Q876*�1NDe-ʙu��%?�WQ��X�]�ԪKz��D�R��_]��*5��g�V��*�򷝞����h�GVWX��\���F��۸E���<>�]gi�_J�.8)���������n)�J�q�%X��P���I��L͟o{��5��KW(����lK 1�1���DMz(�C���oXv��8a���'.��p��o�L�T� e!�Pl�_Xg�:� ;�8��z�BΩ�� eP~p��Q�D�A��]T���u����>΃Q      �      x��\˒�Ʊ]�|v�"
$�W{�I7����m�) jE��nQ+���_r3�^Y zl߻���&
U�8y�Q�}��9y�:=������7�U��߬�L�]�OsY�i^��q�ݥ";nv2+W��Z�v==��u�f�t�N�����͗���|���,O���~�-�l���"�k�^�J&�ysӝ�U��^��[�e�ҔR'�J�֍��md7���"�Q�SU�"{-�A��N����䩑z�HX������]`����p�M�(xV�mR�����I�V/���e{�����BUSײ�f7F�����]��-�:V�;�>-��
t����x���f���U�����ڝ���Xm�J�rO��:�&K�2��.�}�">ɇO�����w��H^���W��Z��pYya��$��OP<�t�9�������?��ҥ��D�LH��������7�>���if�(m�*��rg}y��y��7Y��^�������ax3(�~�����p���w��Aut0=�  ]����Jw֪���$�^������o��ux������9����$V��X�)`ӪW��lM�| vvS��ؓ��1�>�Ģ��O� :�F�� /�Q`x"t.�}�ս ��0�ư�r���I�;g��^
�ԪO��ĝ,��g�[�)Vu���&����U�C|/�
L��e����"�a���hq�#����8�
�S4������ȟz4�K"a&�t` m��d:�d-�L~�u�-�i�ժ�+%z��O��]��(�N�J����mE�pE�0�	q��WfMТ�/]���q�³�J�8�ha�#R�̆ɥi%٤՚(�� '�u8�WKKJ!7a����IGuݔ��`n�:�B�!�!ص�"Ey���5`���ވ�'%�<L�w�{�1�T
�锲�p׈��[��G/�G�#@v�\������ �{W-c/zU�3�Zi��̛@���ZT9>ɥ��oJ���A{��^U?�ewh9�9�X�!��[���@uA�/�dc����A^�^Y�e#&�9��6�DY���h�rh� ��Iz=䠇���������$�c|�@2�������(yj���T�.����4��li�Kh�z7tn��$N8~�6z����* %N��`o�"���j��`���E��9�H!ڐPA�`5���:�1���.�������6 (���kx�D��W�ȅ2�-)�@[ [��0�xa����I2�'������w�u��UBG�}l�K0}����j�@��M=x)����/#�g��D�LQ��B��0<� ��6b�*���Iӕ�X���	��|�	<p��Ţ ��ȕy�/�ش����q�ȋG��-/E/J��񼠽yE�@?�����d�;���ч���#|�>(d5��Z$:A/���#���?�~��)ꆬ܃=�����w�B�9y��l�MW�������%fv#�!x���i�j� �/U���-H=li���ʻ�"�;�h��Ɋ������4 c�4(�5|9�몌����$�@@�:ۃ�>v'���������i��g��Dg:���]����x	.���s(�q#��G�/��Z��y� �6
T�|i��]�	�j���J��@�]���V����d4�$�O5�`|���it�(�/,�W@5��<h�K�/�3@�qH/�m>�B(Aԧ߅�'���f�N�m���UZ����V�Q�l���\ֺ����]֚=����S³x1)���I�M���� �a�����Z�Aj[�jspiA��pYsH�F=v����$d|#�O×h)a#�Z�~S� 2�x�P����I�-�W��u�IO��P�����2��!Ku)�|]�i�����j��m�,��8[ݯ�>��{��ժ�ey?U�ݶ( e��g�"����H��xX�	R�LUK�L
Rk�K��5�:����^��svB6�mn�Q��� ��m�e:1��:;j� pA�#}uF��֞,��h�0R%�?��L|����y7�:��Vb���7�zoO%�q
� G0L�F�8��0 ����I��Ap	�(Ꮟa�����r�6��T�~��f�"��MA߰�aƝ�Am��)Ȝ;8�!Ԛ%o�f�r5����B:#/W���L�U�����#p���k:����$���ɨ�i�ON��I�3���ޅ�!�`���%f�X�@�!��2�xK��Y7/D�1	��!9×kV���UJ[ �QM�"�[�[���!�$�%������kG3�}��g�̤�Z��q �3�٧X`����F��S�9���! �F�ʧ�΋���$ �D�rx��i����\�3�M��u� �#J���"��ٳI� ��`pD������b1�yeDO����K_�(f�D$�˱t.oj*� ��c3�w[�1�
����˓�+��϶b����Z1��kt�*3E)����1N����_�*�$D�Þ�EC�/����5���si<H:�KOXi�P��L� �ut,O�-i E�X��XhQ�P��U�J�l��F��s����HH�G�(�#,[$��)$��\䱙/�`����`�-rGpXs�Z�0k���\gV^$-�Ź,#�f�e`0�B$أ�(���8P8ID�6��Q.h�*
s�� �]X1aÊ%�� ��؛ b��=�s�8���y�8cu
kC�ԴwYM�~;5�t���j����U�0%�e|Ĉʄ0��Pva�/��p�^�1��Ǧi��5�1�;;�,ZJ%+��T�4��x��>
�|�*[E@҅�-p`g��ӝĐIA�D�f�8�+Wyg2����ɛ1�w��X�c�X�8�6�z��|UB�R��qw<�ǣ b,���~7����f�����$��y����jX�~)�'�^�v�[!$K���K��}PH(r��W�)��$�����qA�yN6�ٽ�j���jَ�\���f�`p�B�|̄��<,)t���:@����A����2+�cQ�8��L��6H�����SUJ�YW�,w)�$yC�L�M7��ErV�h+���/P6�	Wʫ�,�[�х���3X��`���wQۇR�[��p7a���V�.�i�fo�\ж'�x�{x�pm,a�1q��g�-��{co��,D�35��H&S_|bp�E	,r���Đ;�-��+�����q��m���i��k��Ԑ���D��$~:�_����KE��� n.=�N� *�	@�P�$9�46�ҫ���Z�
�oiۢ%d2wgE�!)���$��2�
�X�Yx���}1v��N�W�63����ؐ��7�V=}te'��(��-��[xD�c4cg��M��oN�/��Q��V|��Г�B��V(2H�!r$P�W�b�U�m݀
"9y2�9Y�o1�>J��[��S�N��3P�)���T�I+L#��9蹹�~��")��Q���K�^t.���v�y�~�es(rSoJ@�:��8��O��Uiv�q'�^��3!ssx�n���?ߦ�:]m�,{�6���r�?|Ѝ订SP)ہ�@��2�CA��<���p��p6�+�N����ˈ����łQnL�	�qe;vctWq��#��{�+x���#��b"*�/3�!�G_'-�
���<b�B@!d���s� �{�Vh��C5���,����U�ݦ�X��c�����Ǣ�l'3,yU�&� �(?;�bS��l�e�L"��
bk��"gW�Q�H����,'�hѦk���N�� �Kz�����qn�E� &
���v��#���۵���g}���Ӹ �E�wJ�� ��Y�~/���Z�o<D%��}���T��k4:�chl`{�`���������-,�Z������ٖ�kQR�emP��L5bF�P[��\�-�
&�3�rJ&;��~���U	��is�f�MR��/Ka��=x����=ލ&}l}�7j<��*y3h�C��V� �
  Me�f���^]l�2DלrY��k驜iyQAe1灍6�9/���|����r��FJ�ܦ�1?ۑc(�M���8(��M���pw���Fn�"6�_�E�l�|��n3¿�fD|��&$�����j������zB�!���Rm�%�I����3�# �sV���������r��!jm�� �5X���1o�iFh2��Ճu�'_1}Z [�y�['.���f�0O�BN<y#� ��QS��|V�'�@�4,π9�65�o�y��jj�Qx��
�m���(��Ѝ9��YQ �3
��=$ٝ���QY?w�NЯ�E5��Ё���,pa��Wu��:�f�<������M&����h���Zv��o�Z�3�h��Ula�d����܅9�;?!���{�#l/]vb��5��l�M?2��|P2t��I��C����,��O4^�UE*��.�F���,�@�����f����{����3�a����B�N�p��ޮ����Z��8�9ᬁ�4��<������l�7c�70���;���H+��LJ�͙�	��`٦P(��ד��ĳve�ߤ��T����s�@1�H�K�pɏ O-�i��2 ��Λ���;U�ܭ���.r1�,�ALY�5���[ه���T�m����`:�]��{i�m4qF��q�#��=[V�����Cs#=�I�w��i�����u�2({[�B'1E,@�H	qJ1#g�ݶ�|�^!~�Չ�֓�x^�����n�j㓛��f؄�j��*%�ڤ��$��?GZ'@WC45&���0Vp�qR��zľ"e��T1��@ϏXϒXw�,��Ǻ\��Jl!��d��E���~Q��)!�3�PV��fs7ѳ{� �?�r]��|����s��u:��Ɲm�JTU�#� QBB<�ϐ�Z3�廩�ߘ��c�o�p6��K�,�z��n��ݸ�I礮������f�uV����\�"kH�E]�r���Ug����}�O�|��j�_��]���r���Z�s_M��EU�^�f��,�t�J�1kƖ#�ۓf/o
��M�u!؛)3U^�z�"�fQb���B��8�%�����.%6�&��`X�ʞ|��#��~П;���:��K<�=su�6��[)�N��s�.��qe�;{c��y%����]DM�Ve��b�}��?�x��]<�ǯ�D�w>�s���Y7Vx�i�zH2�Ab�S���p�&��6���=7~����oW��2j_���:�>�
Y}Z*�h W'~�F��f�su#j��6�1�罙���|>���;4�~3(����Ef��/Ҡ����Gk3�#�[c�]��u8C��W��3[.�)����^�z��pV��~�ƌ���v�6$XaV��E܅ǜ�F�\e4h�? 3�0}�{%�W�Y� �R�)X�ڒ�n �D��͖�� ��.u�s�\uQ��lN�zt��n�����<�|�l��<!gӳsQs�lh�.��Nc��8U�|�5s͑��t���e�4�\7mE�9��Y_����4H�^	���ah��H�����#��0�P�	v,�Oe�܈Ͷ�>����| vf����&�L`�; s�H��"�/�3�E�� G}���r���QM]�B-'f�͔����K"��K������ ���,��(`Ӄ��u8�A�C`joѾ�����f�#CΡ� �=A��a����b�\h��,�s�C�q�~�Jw�2zy1�8«AH��Ď������i'�;�eZ���qu�\�x�� ��M������F둦�h��x�u3y7'�[���6���G���ئt\ۚ��� �o3ȉ*[߽��Y�G6/v��6��;\8>�3r�'�y$��y2~�p����"{0�s pXo�S����S�i�b$�����rLw{H}�z�M�r���a��6��n]�_h��m6M7��|�<�����Ȓ7D[裢�7MQ>�x�,�;�^��h��L3���8���0^�Y���1�����:l#�^�P�^�����_����ҭ�Z�C!��?|t>��b1{*�o���o 1�65d����|�nw�^�c�d9W�n�kY���~�I�҃�d�*ϋ�v�����������fA�/έ�>�t�(�k@zs3���'��~(�n�-$]��Y��PU�q���uW�
&�y���}\�:I�?����-�����8�"S�Π��0�%�Sq��G���G�Ja�p�ā�kOW��p�~��=I||x���*�����!w�DX�&�B�̾<��s�0�6se���N|K8��[�Q�����M8G�0��W��׳�3�lި,i�-�::?�$���8��j�{����E҄Z�e!?8ٕ��$Fc:Z����ft.�.̟�0I�}�㯪Mk3oӍo/|��@��]�8����#Ď.c܍���Zq�S��3w\>nI97%>�/�x��\Ǳ�r�@S�q��^�t�N�"jht9���v��E��Ϊ�t��p�7��)�;O{�E�-u;�!���A���ǯ�b
��@B1�h�_�_ޥ�������em���
�w�s����o�Y#�k�&���.Zg.���(�}�8m�1�����ĳ<�0�`�6���W���#��	�M7S�.dHs���I,6�^���_쩸N%����%��kb�t��R��/̂��9��h�w��?\Du����i�4Q�ln���5�#����$,`ߖ�~]�{����;      �   �  x���Kr�6���)p �H� ���/&3Uv*���єS � �(�\#��IҠlI~mg#����-�}ß`&�Uy��=�)���ߒ)�i���qy��s8�+$GP�2��&����)��89��Y���<�A�x���N -U[SQM!*�U�զ���
V�Z�K���,6�̛�mXnx��WE�0����Ї�E�Nau�:/E�=�M��0�Ψ���A�.̑�?�1��.n��Ǩz�7X��y���e��C�$���&��!*M���^e_/����F�"y���M���=���zx��J�j�@t��� fi+��5�(K|��QV2��xo7�[Y���~B���q���2b��XQ�9��7�y9���OnxS:�����ĝZ�6r��~Y���fo� AObʭ�)��k4��'Ĝ|�Ǵ���Cx�W�=f,�_UA�@��DY5L0bq����㞩��0>vX򕫯��]Y��5-t#�蔤Z
M�VL�E-xa>�_nD���-�6�U�/�����+tkvw���_n'��H�'��,
�P�ٰȡC>����	a@L�k�DqM\0��.�x�$sM�^y�糾�~�0����#� ��r��^JO'���xA�����)�N�+�"j&�6��-p�h�Z������U���=�R�%�*�{ ��f�K,�H����Ylu����re.��������3%b]��u}��7S���Ŵ��z���[ �uW�;)�����6TX �4(��5c��#��"_����EQ���l�}��>��zN:�A�,ea}2��%?�� �ݑ�x��&F�)�=�����=_�t�zv�=�&L������x�eG�N=_Z�ݿ���h�itm>Q(x��*��sъ�� ��1���*�-��Ҝ6ܶ�2�.:�:Y�o��FIk���&�P)~�ղ�QeE93x�li��v��*Ź�j���r�lV���G�Z��ԉ�O      �     x��UK�"7]�)t Dח*��lz1aGLGx�MJ�M	�T0x�k�z>�S*
jb�p�WP)e*󽧧|�kﾡ�X��mX��L��g�Yp�=�Fӂg�L��NӇ����]�����\v�>���	{�$q�~I�ڲ���X��\���EC1�'�A�}:z*�,��+�\is8P��۠�V��~�����2�b�hb�`t����W�zj�Z[p��������p2��0�+�3���*k��J�M.U�m�m]���/���x��yɲ|WU�r��l����b�6����s�̝&p���M�ƽ8��������LŹ=%ٳ%���T̑�i�?	�#� �-R����GJp�P$!$ �����M/��"����GJ%B/H,�_�x:*::�qi D���� /�+Y4�6��\�JԒ�&��
�[U >����ݔŗ��k���ڀ�>��r����3#�A' A�l�QP����8��I�?"ҁԤ)H��6I*�0�>q5>w��'eK�EB��GR���K���쓁�S �W��`�t����q��ݣ�"�0�p41E? ���|��T�F!9R�*��/�f[V�?W�f���r�����H��o�]��>#�?��|2�	v��s6"F�`e���1�{#�)+QtP�Df�{���5F��Yq5碚;P]Tm���j�����o[�55B+�y�E�+�u�Uŗ����}"�Q���"���R�1z��:k��+�c{#l�k�o������D���'���Sn���5N����F�1�y���XND�'G��+�4 �6��ɒ+ՐLۮ�e'eV�l[�Oe��vݴ�G��f�U��덮���k�'P��p�il K�v�9>�Q�~���i���UAr���]H ��("8��/����Rt4j��>n8���3����[��A"��2��l��K��o<���߷7szY"W���U:������b7Ze��.r�y��*���J6X����i!e��O���������_'��      �   X  x��VMs�6=ۿ��I�DI�ts��ݩ�L�Lz�"V$l` R�r�����/�[���؞��Ap?޾}��� �Z[q[Jv#�̵��'�)��?{���»wB!E�jdM�m���䃮����BMފ�&�^-E)�g���ѕU���.�d3�*q#�JY�,���B�`R��'�ۥ��|���d	�a�RI��ʻ���n�}��P�%�*>�.uY�x^�����,�o�ْb?�)ɻ&�:'a 2�Ӓ��ih�B��F[i3-�@��}�D��Mx�T����k���*��%R^$9g-�++�����z��f8�.�x���Ȣ�"$��S�lhL-m�\r}_�` �6Xܭ�^��J��3m6��"g{Jl�+E%C}R0��ĺ�F�력��q�`��NY�`�qIrb��@����{�k&]�܏��7�qR���e�����7�N'�z�N��R]�,�j9�l~6I&�a��S�LV�t5]��s>���p<�t5��ҋ�,I�'���>��J�B�g}C�/?�/۞(t^����mt( ��p6�a>��`	���220��Q6Vg�$�{�
���������δ<B����Q�}Oj�y�V�����r$��h�kr�^^s)���
������ѧ�D8�,�6z#�1"P��%(`c	C ^�NY�6��D4*�=���V�z���e�L�d���P%����	�-phǚe����,����l�"0�Ry�X��!�������k�@�������DVHc�80�}a�hm�j�Ѻ-B���L�r ¨<��t,�>��G���;��ϥ��[��}���Ԉ+��^{�x�����7��j8�{'t��w�I��
O��(��LDed�tm����p��L��{'|1Za(�xy(�A?�>�I���>/�s��;�X*�'�Q<az�X��~�؃Ձ��v� *T;gp�����o����?h����i�<įr+]cj<�z�j	y���Os�g`�;��s�ς� ���I�]��X|�B���S!Mp"n���]���5+��U������
��|���fg&+:U��b>�-7�i&���|)���l!�*�,2�����U����=C-�"�&�Ur1Z�g糳+��\@g�N1q�Iz݋&s�N
ݼG�ֈ����?��VJ����"z���,fs�=$���"��4�p�vM�O�8�cT��Q��>�e[F���@�
U�5�?�6�B�c#`�j��p妗Ɏc�oT@5�N='}kt��t6�����Ȋ_<����G颧4�+nP7>���ʭ�ƵS9�@q��I����@�,,�Od���ͦW.�6��o-{�-�qhG V����2��.����x���� /o�(L�P�#���nT��B��c���h8	��i�N��7*���\���%���N��� ؼ�a���I���z���|;9\UaWb-�6����ŋYp�ǭ.��ڞQT�"�x��\FUǹ�Dcyx���QGY9�ur~ ��$4f]aʵ������,��Q�.�z�^L���d��j3��E:�e��t1���jw��j�+����F����em�      �   �  x��ϒ�6�׭��n���?�����E&S���f6ؖm������s-�pv'�S��NcI?	�OG�M����W�7?�|�������?~��!;t�k=����]v�\���9��_|;��	~�W:��Ⱦ�;��>�];��{����f�)����=�o}w�� U�~{��~�/��K[�&�[J��K}���U��g����>eP��T��~ a��6��&�2�*��uC��p��zk�շc�Q��½�>���Y�5�:N�{F�ۍ��Wc�O7x�],v��Ǫ�އ��/2��5����r�Sj�s.J�Lg��?uh���Vo���֟���Cwn�?��*�.�/����Ԟ��TԽ���TŪ���~��w��;�s{�\����ɾޫ��?�M�����/S��m�65�Cc��j�:(��#4n�#@��B�#� �
����ޟ��C_ �%n�f��]D~x7��>�>S��+÷E�S��u�W��C�G����g?�����u�ߠ�í�'���VP�P�[Տ-���.�3/�߇��N��t�oSM�����s5�郡�7�w�\4W$;��z���@��Cu�S'P�y�*d�۝�;e�.Ŭ��5Y.w�]��/?��px�<f�'�P�P��|�44���P�?{��z�o�A�V����W��[+h�0���;��C��.�F��t����0��܅A�1�Nw`5u�=��p1��~6�-ܬ� �����đ�p�oCv�{{���A7M�����Me��G��o�e~����}-��O��W�����_�)q�@��H����ٿ�i�����2����v���QK�N
<�.P��%�>t�s}�n �}v	��J���z�l����If=�Q��z�Kn�z�3Sd��F�g:���0;��t��:�� ��;Q>әuD ��</�g:s�`��G�g:��$�v"D��Lu�,@& �y�FuV�D ��Χ�X���JZ'�% vyɕ�tV�'�& q�����J�ĸd�q�����DN����]��M�E䈱��;��Qd�q�0��΄�h�V\���Т�p�]^p�$�Z�@O�K^�u8���вz�Ls�'��,M؋�`~�]�ŋ�,-K�'�,/ӥ��3K����+�A`֙�e	���֮M٢3G�(z�&,�%��3G�X�d&�:s�.��$s܊d�J�YI�z�$��ʮS���J���)���6Y��:+�cЂ�ɶ�Eg"'S��%+$W2�D�+�2ee����u@@����������ir.ME�	A!):˕I�mE�\��)S��-@G`yQ&)��Z�F ��d:�: �����%Aiԙ�A���/�P�i��3C���*��ƹ�Yg�"R􄱄����,�B�g*%/ғ�Qg��H����q�u֙�R��&����b�t���J�O:s��	��ȓM+Qg��G�	h��N�@�YIۆ����Sɉ����1z¾�*]�:+�cg�s��ݣQf"'C���7�$�8�'FO�[�����Ig�<1n,�Ix�$�أ�4����d�ʢ3M~ ���T�*ufh]�@�o�}tљ�`�@���q��3C��@؜�7����p��`��j'5׉!��� {���[$~ ꀀ�QlE��֖�Y�b#Pĝ[�f�	I):{\�}7ꀀ"Rt��� �u@@!):Ë2	��(_���qk76��: �EjlZr�6D�([��@s%7"�Y�mA�u�G9�;�E`��p�oe��cD2lW/4/W	t@@���/�y�3Q�;FG����Qu@@�A�)�7�:  w�����֫7o=耀�1:ǥ{" �Ƹ \x�����<耀�16����m �u�i� A�^m_y�yclB��@0뀀�16���A��<�[��@��3���"[��}�yclZq�:������,/�z���2B��@��-��Dǃ��"(������"0����;��r���n!����rǨ�&��t@@���N���E䎱���:"Zt&4�ct��b=,:  w��@�3��%� ꀀ�1.�"D>�X/�-:��&,�\��A�q��pw:D�;�F ���;^t@@��R<�,~�r�� �t[&�;�F�����G�;�E`-��8�L�kp��IPu@@��̹��Ji��cl�:])�:  w��@�R&Q��ct��� �u�?��?�;�      �   �  x��Wkn�9���"��>Z�� ���x��Y�3���oіc�� Ȑ飺�U�եPcPZ,�J	մ��g�¹�:}[y�:�J��-��M�����UV�����%���25�a�9��!��N�N��E�j�G�/�F��-�y�~��~��1�i?F�rֶr� )��<%4�@૮��l�A��qV���̓�e:֚�z��tժ�.Y��eч�O�6w��ϔN$'�GC�l��5q,$�_۳?=��÷ow��0~:�V+,�0�Xj�P�-�CO�!�5J�m�C�mi�$���W^-��R�b�d�����:[dw]��ds�Up�Lt�zJzD� ��&=��}����o~����ؾ�����D7gm����:b*�����p��F�����5�z�d�^6=��T�Zk1�A`�p�6$q�����4���|�z">f�$��1�*�������EW~<U*_�2iM��h)��E*J���\�+.=Y��lN=���g�k-��L��t���:9�	�oR�WQ>��)���ZNt��DJQʹ�y^�?����b^����`S�<:�`%�0j������dvY�S��2�v�
��NDYmA!q�'��b�rri��ޫ�]��ё���
��g$z���ަ?�p�#��#@�taS����B�6�� ����HR�adg�E�7��(u��rj�+7���-�-��Ĳj&�W[���tJ|����H�M��{�����������v?����u}��ݯG�'�+�@T!� Ρ%!��Xk�!�	0^����P��4�\b���ZF��T�Ţ��W��[N�|�Ώ�R����ӯ����OJ(�4���ǝ����3����!�Ѭ�nv�L��� Yd�n�ڨ��5�ߧ�o��k^WA����}���ap��/,�p�k�bYpXX�%'ƀL=9@����~ؘj�O���8gK�P{�T� @�$ �\Ĵ4Ib4e\�u�G��1f���`�͓��L�wߟ���O>.����g�b�_��>HXC�Ra��p�9D+F��T3a\�����*2�ʰ��Τ�I}����	TrkaX����:�!ʾ_I'�ǚ4��!#P'����ϻ������x���	jT/��P	�"�kG�Z��|04�dhN�
��0��R!y��)ޣYq��ԡB������<m=ι����"҉�Q�n�!"����w�_��g���G�ݜ㥋ѱCk���.t�v����G�1�!�}h��`�^�r/���Æ�#�A����y9WkT~�B>G0>�A�>|e،Y��ʛ`��/?���yt#څW�5Y�K@��H���;^�B��ˀ�B)6��K�m@�&þ�y��y�#���zS��\���P�
��$/��u�<���.���h8PB��,4��%3a|��a*�ۻ6�s8jk�*#�*�W�x�k��a#"NԞkEXxO�����ˎŒ����%��'?|�4��1&_R8���u)��|iul배YKX��"���!��'��Yz��a䭵��7�Q'���[�K�z��\c�����9@Q�mC��7����ݷM����n�ӫ�ѥ�C�^,��G
�w$�A0�(PwA:��aa�lj,�A���6�Xs�H�!PG��%�%"�V� �\��=q9���L�7�0�D����+?��͕7#K&g��aX%���脔�Wqa��Yaf��RlW�3����V�Џ����F�1���+�֐ޫНwUN\��F��ؙ�E0����?b�~ �2�B䯄N�����k�5�,[��Ͻ�>l�6�=�:50�VA�Wv�ZFz��3����K�#��q�G�y��<��m&��[�꿐ʏ���]!�$(ޫ����	�b�g�|�B�=��Z�N�X `ft�ѾF�WH0 ɥ�Ұh9։�S��*XN	��y~}�SJ$׋˛�_�+��a����7���+��1{���Pߜ;`��^�7�
��@.T�wΚF+/gAt�������W����/Q��0dʷ�*�G{-2_����\��(Q/�Q���L�z�J�眘��bڣ�Î����5%����"�j;�G�Q2,=X,f*�Mp�C�'���A�[����5���[g�:	˝�%��v����� {6_�      �     x�u��r�@ kx
Z�;��`�#?��4��q:J��OA�qh��f)N%^��_xwz����J?\kEÙ�@�r�x_ �U�:�M
zsO�$���N�=�=��p��1R�'76�`O�1�0 �e�1���/>OH����c�F}�� �k��S?n����g+Ӈ�K�t��n�1��Ȟ b`0Bu�W�R��_>Op�}��tV�����G+[�|{o8h��G�ݜFM岃�����afFL�t̫_����nu     