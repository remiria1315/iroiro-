const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const archiver = require("archiver");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: node makeSkinPack.js <PackName> <image1.png> <image2.png> ...");
  process.exit(1);
}

const packName = args[0];
const imageFiles = args.slice(1);

const destFolder = path.join(__dirname, packName);
fs.mkdirSync(destFolder, { recursive: true });

imageFiles.forEach((file) => {
  const dest = path.join(destFolder, path.basename(file));
  if (!fs.existsSync(file)) {
    console.error(`❌ File not found: ${file}`);
    process.exit(1);
  }
  fs.copyFileSync(file, dest);
});

const manifest = {
  format_version: 1,
  header: {
    name: packName,
    description: "",
    version: [1, 0, 0],
    uuid: uuid.v4(),
  },
  modules: [{ type: "skin_pack", uuid: uuid.v4(), version: [1, 0, 0] }],
};
fs.writeFileSync(path.join(packName, "manifest.json"), JSON.stringify(manifest, null, 2));

const skins = {
  serialize_name: packName,
  localization_name: packName,
  skins: imageFiles.map((file, i) => ({
    localization_name: `${packName}_${i + 1}`,
    texture: path.basename(file),
    geometry: "geometry.humanoid.custom",
    type: "free",
  })),
};
fs.writeFileSync(path.join(packName, "skins.json"), JSON.stringify(skins, null, 2));

imageFiles.forEach((file) => {
  const dest = path.join(packName, path.basename(file));
  fs.copyFileSync(file, dest);
});

const output = fs.createWriteStream(`${packName}.mcpack`);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(packName + "/", false);

archive.finalize();

output.on("close", () => {
  console.log(`✅ Skin Pack generated: ${packName}.mcpack`);
});
