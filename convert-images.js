const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.resolve(__dirname, '../../insta-scrap/images');
const DEST = path.resolve(__dirname, 'public/images');

const MAP = [
  ['447898405_448559457792717_4141989407934904835_n.png',    'jus-smoothie-vert.webp'],
  ['448022280_448564591125537_923733693945019822_n.png',     'kefta-tajine.webp'],
  ['448023478_448530694462260_6600120712486320407_n.jpg',    'salade-poulet-framboise.webp'],
  ['448095241_448543617794301_3042489544900379643_n.jpg',    'crepe-toile-chocolat.webp'],
  ['448096422_448561654459164_3552511347734070909_n.jpg',    'mini-pancakes.webp'],
  ['449954467_464591496189513_9004452523777640632_n.png',    'pave-saumon-legumes.webp'],
  ['449956869_464595382855791_4808728456205090507_n.jpg',    'entrees-poster.webp'],
  ['450052273_464588552856474_7944443335257363180_n.jpg',    'pates-saumon-poster.webp'],
  ['450073531_464596739522322_7504794872246336265_n.jpg',    'pizza-fruits-de-mer.webp'],
  ['450085270_464593512855978_7722571849300724775_n.png',    'crepe-roulee-chocolat.webp'],
  ['450183361_464587346189928_8397713353079152779_n.png',    'jus-multicolores.webp'],
  ['450252001_464590086189654_6898596965072900342_n.jpg',    'freakshake-bubble-poster.webp'],
  ['454194462_481133534535309_3293782883726080040_n.jpg',    'dessert-roule-chocolat.webp'],
  ['455119443_485446894103973_773540785575542160_n.jpg',     'cafe-creme-poster.webp'],
  ['455179311_486687100646619_7734037073904321730_n.jpg',    'pave-saumon-poster2.webp'],
  ['455862386_491226063526056_2891267281226667321_n.jpg',    'burger-double-frites.webp'],
  ['457746777_498964289418900_1359922007200012890_n.jpg',    'cafe-creme-chantilly.webp'],
  ['463645361_18116877346396724_4707496401767153383_n.webp', 'freakshake-royal-poster.webp'],
  ['464352071_18117376927396724_5316166255463148616_n.webp', 'sandwich-poulet-champignon.webp'],
  ['464768775_18117938323396724_5624689808887115088_n.webp', 'gaufres-poster.webp'],
  ['481116969_616964287618899_5007207615043514558_n.jpg',    'gaufres-chocolat-fruits.webp'],
  ['491423710_1350013216118794_6799235063856341119_n.jpg',   'interieur-nid-abeilles.webp'],
  ['503215583_725735280028939_7258535617634120650_n.jpg',    'interieur-ainchok.webp'],
  ['503666791_1927254794675875_7508249344080114758_n.jpg',   'petit-dejeuner-table.webp'],
  ['527415197_18144944104396724_56153889904984227_n.webp',   'date-pudding.webp'],
  ['527548230_18144944065396724_586110433822777722_n.webp',  'chocomisu.webp'],
  ['527972079_18144944146396724_7552357111771985208_n.webp', 'cake-miel-honeycomb.webp'],
  ['528257250_18144944182396724_8849873271987959878_n.webp', 'crunchy-pallet.webp'],
  ['528278332_18144943963396724_6306600471964545752_n.webp', 'semifreddo-noisette.webp'],
  ['528854174_18144944005396724_3629739292404631908_n.webp', 'sweet-box-verrines.webp'],
  ['589903998_17919715422248833_6527804351094343883_n.webp', 'salade-fruits-de-mer.webp'],
  ['619067276_17924085585217086_2270616885671907197_n.webp', 'tbone-steak-poster.webp'],
  ['619844324_18037921295734176_7588097605994041538_n.webp', 'brownie-skillet.webp'],
  ['619871883_17960521437044289_6539302051747556386_n.webp', 'jus-fraise-tourbillon.webp'],
  ['620451991_17972937695992199_7892613949645281311_n.webp', 'crepe-zebre-glace.webp'],
  ['620950516_17954038071061836_4020184871825244009_n.webp', 'freakshakes-deux-lotus-nutella.webp'],
  ['621582682_18070985504613879_5036666651606017203_n.webp', 'cafe-creme-quatre-verres.webp'],
  ['621633096_18040105193726812_786881024188203723_n.webp',  'freakshake-oreo-chocolat.webp'],
  ['622276257_18068809676549809_9203430388623285811_n.webp', 'freakshake-myrtille-violet.webp'],
  ['623211446_18107267434776497_9130314468121631813_n.webp', 'burgers-poster.webp'],
  ['623329082_18037514801758000_1565513586462145160_n.webp', 'cocktail-orange-framboise.webp'],
  ['623391729_17993313998876209_4993724758952664237_n.webp', 'steak-legumes-grilles.webp'],
  ['624280627_18092832982973809_6079036031298269291_n.webp', 'bubble-tea-cinq-couleurs.webp'],
  ['624620658_18092846623982103_8644690774739408321_n.webp', 'dessert-roule-nappe.webp'],
  ['624731013_18076103081605573_5471811101888170842_n.webp', 'bubble-tea-bleu-rouge.webp'],
  ['624837051_18094464262985572_2320795476803514245_n.webp', 'filet-mignon-poster.webp'],
  ['624852627_18050926637705250_5594975062118373963_n.webp', 'salade-crevettes-cajou.webp'],
  ['624945918_18093354274975657_3138411764082890135_n.webp', 'spaghetti-bolognaise-poster.webp'],
  ['625004150_18076449860580128_4600310344775320029_n.webp', 'tajine-agneau-pruneaux.webp'],
  ['625055548_18142255369424327_6902959391981368884_n.webp', 'salade-poulet-poster.webp'],
  ['625094058_18071510210431114_3072568132424898811_n.webp', 'chocolatees-trois-verres.webp'],
  ['625286483_18092382562956887_2144679879573493346_n.webp', 'freakshake-nutella-closeup.webp'],
  ['625315965_18032667596773403_5596602960082384282_n.webp', 'pates-saumon-creme.webp'],
  ['625668469_18079370066032789_1316161209758461648_n.webp', 'pizza-champignon-blanche.webp'],
  ['626008784_18125316853555762_3151586159239639205_n.webp', 'pancakes-chocolat-framboise.webp'],
  ['626568780_18042241001512094_4777439140389642641_n.webp', 'pastilla-poulet-poster.webp'],
  ['626698030_18084019616179753_2968980595412228573_n.webp', 'jus-vert-frais.webp'],
  ['626861421_18106509874703631_6269181961071207383_n.webp', 'cocktail-bleu-ananas-poster.webp'],
  ['627245961_18305606278275180_2851593216187510808_n.webp', 'salade-composee-poster.webp'],
  ['627385379_18110466043636545_477183522187781337_n.webp',  'pates-carbonara-jambon.webp'],
  ['627407772_18320884606223230_1372289358433269203_n.webp', 'freakshake-caramel-chantilly.webp'],
  ['636288545_18443526400108326_3678673391874513611_n.webp', 'spaghetti-bolognaise.webp'],
  ['642444731_18570174058050871_6160556925069663562_n.webp', 'brownie-oreo-glace.webp'],
  ['670895720_18172894009396724_5346074155953912181_n.webp', 'crevette-teaser-poster.webp'],
];

async function convert() {
  fs.mkdirSync(DEST, { recursive: true });
  let ok = 0, skip = 0, err = 0;

  for (const [src, dest] of MAP) {
    const srcPath = path.join(SRC, src);
    const destPath = path.join(DEST, dest);

    if (!fs.existsSync(srcPath)) {
      console.log(`SKIP (not found): ${src}`);
      skip++;
      continue;
    }

    try {
      await sharp(srcPath)
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`OK  ${dest}`);
      ok++;
    } catch (e) {
      console.error(`ERR ${dest}: ${e.message}`);
      err++;
    }
  }

  console.log(`\nDone: ${ok} converted, ${skip} skipped, ${err} errors`);
}

convert();
