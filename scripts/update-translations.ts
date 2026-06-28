// @ts-nocheck
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const buildLexicalRichText = (paragraphs: string[]) => {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            version: 1,
            text,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      })),
    },
  }
}

const leftContentFr = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'heading',
        tag: 'h1',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [
          {
            type: 'text',
            version: 1,
            text: 'Bâti pour avancer :',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
          {
            type: 'linebreak',
            version: 1,
          },
          {
            type: 'text',
            version: 1,
            text: "L'ADN du studio",
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
    ],
  },
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  console.log('Updating Homepage translations...')
  await payload.update({
    collection: 'pages',
    id: '6a35f2a9f84d0116c5d5a2d5',
    locale: 'fr',
    data: {
      title: 'Accueil',
      meta: {
        title: 'JAIKAY | Studio de création numérique à Montréal',
        description:
          "JAIKAY est un studio de création numérique basé à Montréal. Nous concevons des sites Web évolutifs, des identités de marque et des systèmes technologiques pour propulser les entreprises d'aujourd'hui.",
        image: '6a35f29ff84d0116c5d5a2be', // Keep the media ID
      },
      layout: [
        {
          blockType: 'hero',
          id: '6a3b387005a52ad7c95d34c6',
          backgroundImage: '6a35f29ff84d0116c5d5a2be', // Keep the media ID
          content: buildLexicalRichText([
            'JAIKAY est un studio de création numérique basé à Montréal. Nous façonnons des identités de marque et des sites Web sur mesure pour propulser les entreprises à chaque étape de leur croissance.',
            "De la stratégie au design, de l'intégration au soutien continu, nous concevons des expériences numériques réfléchies et axées sur la conversion — que ce soit pour lancer votre première marque ou pour accélérer la croissance de votre boutique en ligne.",
          ]),
        },
        {
          blockType: 'services',
          id: '6a3b387005a52ad7c95d34de',
          servicesList: [
            {
              id: '6a3b387005a52ad7c95d34cb',
              title: '01_IDENTITÉ DE MARQUE & CRÉATIVITÉ',
              items: [
                { id: '6a3b387005a52ad7c95d34c7', item: 'CONCEPTION DE LOGO' },
                { id: '6a3b387005a52ad7c95d34c8', item: 'TYPOGRAPHIE' },
                { id: '6a3b387005a52ad7c95d34c9', item: 'PALETTES DE COULEURS' },
                { id: '6a3b387005a52ad7c95d34ca', item: 'GUIDES DE MARQUE' },
              ],
            },
            {
              id: '6a3b387005a52ad7c95d34ce',
              title: '02_DESIGN MARKETING',
              items: [
                { id: '6a3b387005a52ad7c95d34cc', item: 'SUPPORTS NUMÉRIQUES' },
                { id: '6a3b387005a52ad7c95d34cd', item: 'SUPPORTS IMPRIMÉS' },
              ],
            },
            {
              id: '6a3b387005a52ad7c95d34d3',
              title: '03_STRATÉGIE WEB',
              items: [
                { id: '6a3b387005a52ad7c95d34cf', item: 'ARCHITECTURE TECHNIQUE' },
                { id: '6a3b387005a52ad7c95d34d0', item: 'ÉTUDES DE FAISABILITÉ' },
                { id: '6a3b387005a52ad7c95d34d1', item: "PROCESSUS D'AFFAIRES" },
                { id: '6a3b387005a52ad7c95d34d2', item: 'ANALYSE COMPARATIVE DES PLATEFORMES' },
              ],
            },
            {
              id: '6a3b387005a52ad7c95d34d7',
              title: '04_DESIGN WEB',
              items: [
                { id: '6a3b387005a52ad7c95d34d4', item: "ARCHITECTURE D'INFORMATION" },
                { id: '6a3b387005a52ad7c95d34d5', item: 'MAQUETTES FONCTIONNELLES' },
                { id: '6a3b387005a52ad7c95d34d6', item: 'MAQUETTES HAUTE FIDÉLITÉ' },
              ],
            },
            {
              id: '6a3b387005a52ad7c95d34dd',
              title: '05_DÉVELOPPEMENT & DÉPLOIEMENT',
              items: [
                { id: '6a3b387005a52ad7c95d34d8', item: 'COMMERCE ÉLECTRONIQUE' },
                { id: '6a3b387005a52ad7c95d34d9', item: 'SYSTÈMES DE GESTION DE CONTENU (CMS)' },
                { id: '6a3b387005a52ad7c95d34da', item: 'ANALYSE DE DONNÉES' },
                { id: '6a3b387005a52ad7c95d34db', item: 'INTÉGRATIONS TECHNIQUES' },
                { id: '6a3b387005a52ad7c95d34dc', item: 'SOUTIEN CONTINU' },
              ],
            },
          ],
        },
        {
          blockType: 'twoColumnText',
          id: '6a3b387005a52ad7c95d34e5',
          leftContent: leftContentFr,
          rightContentBlocks: [
            {
              id: '6a3b387005a52ad7c95d34df',
              content: buildLexicalRichText([
                'Nous sommes là pour provoquer des changements concrets, avec agilité et efficacité.',
                'Sans détour, sans compromis. Nous combinons vision stratégique, idées audacieuses et technologies modernes. Zéro flafla. Zéro friction.',
              ]),
            },
            {
              id: '6a3b387005a52ad7c95d34e0',
              content: buildLexicalRichText([
                'Nous ne suivons pas les tendances.',
                'Nous bâtissons ce qui compte.',
                "Des solutions évolutives. Des idées qui résonnent. Des systèmes au service de vos objectifs d'affaires.",
              ]),
            },
            {
              id: '6a3b387005a52ad7c95d34e1',
              content: buildLexicalRichText([
                "La technologie n'est plus une option — c'est le socle.",
                "C'est le moteur de la croissance, du fonctionnement et de la communication de toute entreprise. Nous aidons nos partenaires à l'intégrer de manière stratégique pour en faire un pilier de leur réussite, et non une solution improvisée après coup.",
              ]),
            },
            {
              id: '6a3b387005a52ad7c95d34e2',
              content: buildLexicalRichText([
                'Nous simplifions la complexité.',
                "Notre rôle n'est pas de rendre le numérique mystérieux, mais de le faire fonctionner. Nous unifions les outils fragmentés en systèmes cohérents et remplaçons les processus lourds par des solutions fluides et intelligentes.",
              ]),
            },
            {
              id: '6a3b387005a52ad7c95d34e3',
              content: buildLexicalRichText([
                'Nous collaborons avec des entreprises prêtes à évoluer.',
                "Celles qui valorisent la clarté, la rapidité d'exécution et l'impact.",
                "Celles qui veulent agir avec intention, plutôt que de simplement réagir au changement.",
              ]),
            },
            {
              id: '6a3b387005a52ad7c95d34e4',
              content: buildLexicalRichText([
                "Il ne s'agit pas simplement de suivre le mouvement.",
                "Il s'agit de tracer la voie — avec confiance, intention et créativité.",
              ]),
            },
          ],
        },
      ],
    },
  })

  console.log('Updating Contact Page translations...')
  await payload.update({
    collection: 'pages',
    id: '6a35fa3bc1dc14be79de6ed0',
    locale: 'fr',
    data: {
      title: 'Contact',
      meta: {
        title: 'JAIKAY | Nous joindre',
        description:
          "Entrez en contact avec JAIKAY, studio de création numérique à Montréal, pour discuter de votre prochain projet de site Web ou d'identité de marque.",
      },
      layout: [
        {
          blockType: 'contactForm',
          id: '6a3b3834b474976c856ba66b',
          heading: 'Discutons de votre projet',
          successMessage: 'Merci de nous avoir écrit! Nous vous ferons signe sous peu.',
        },
      ],
    },
  })

  console.log('Updating Header Global...')
  const header = await payload.findGlobal({ slug: 'header', locale: 'fr' })
  if (header && header.navItems) {
    const updatedNavItems = header.navItems.map((item: any) => {
      return {
        ...item,
        label: item.label === 'CONTACT' ? 'NOUS JOINDRE' : item.label,
        page: typeof item.page === 'object' ? item.page?.id : item.page,
      }
    })
    await payload.updateGlobal({
      slug: 'header',
      locale: 'fr',
      data: {
        logo: typeof header.logo === 'object' ? header.logo?.id : header.logo,
        navItems: updatedNavItems,
      },
    })
  }

  console.log('Translations updated successfully!')
  process.exit(0)
}

run().catch((err) => {
  console.error('Error updating translations:', err)
  process.exit(1)
})
