const homeView = document.querySelector('#home-view');
const detailView = document.querySelector('#detail-view');
const modelInput = document.querySelector('#model');
const detailTitle = document.querySelector('#detail-title');
const driverPageDescription = document.querySelector('#driver-page-description');
const detailDriverLink = document.querySelector('#detail-driver-link');
const networkGuide = document.querySelector('.network');
const manualList = document.querySelector('.manual-list');
const popularModels = ['IM C3500', 'IM C3000', 'IM C4500', 'MP C4504', 'MP C3004', 'MP 3555'];
const officialDriverPage = 'https://www.ricoh-ap.com/downloads/driver-for-office-solutions';
const modelDriverPages = [
  { models: ['MP C3001', 'MP C3501'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re2/model/mpc281/mpc281.htm?lang=en' },
  { models: ['MP C3002', 'MP C3502'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/apc/model/mpc300/mpc300.htm?lang=en' },
  { models: ['MP C3003SP', 'MP C3503SP'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/apc/model/mpc3003/mpc3003.htm' },
  { models: ['MP 2001SP', 'MP 2501SP'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/apc/model/mp200/mp200.htm' },
  { models: ['MP 2555', 'MP 3055', 'MP 3555', 'MP 4055', 'MP 5055', 'MP 6055'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/mp2595/mp2595.htm' },
  { models: ['MP C3004', 'MP C3504'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/mpc3004/mpc3004.htm' },
  { models: ['MP C3004EX', 'MP C3504EX'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/mpc3004ex/mpc3004ex.htm' },
  { models: ['MP C2004', 'MP C2504'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/apc/model/mpc200/mpc200.htm' },
  { models: ['MP C2004EX', 'MP C2504EX'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re2/model/mpc2004ex/mpc2004ex.htm' },
  { models: ['MP C2003SP', 'MP C2503SP'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/apc/model/mpc2003/mpc2003.htm' },
  { models: ['MP C4502', 'MP C4502A', 'MP C5502', 'MP C5502A'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re2/model/mpc450/mpc450.htm' },
  { models: ['MP C4503SP', 'MP C5503SP', 'MP C6003SP'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/apc/model/mpc4503/mpc4503.htm' },
  { models: ['MP C4504', 'MP C5504', 'MP C6004'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/nrg1/model/mpc4504/mpc4504.htm' },
  { models: ['MP C4504EX', 'MP C5504EX', 'MP C6004EX'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re1/model/mpc4504ex/mpc4504ex.htm' },
  { models: ['M 2700', 'M 2701'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/apc/model/m2700/m2700.htm' },
  { models: ['IM 2702', 'IM 2702SE'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re2/model/im2702/im2702.htm' },
  { models: ['IM C2000', 'IM C2500'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re2/model/imc2000/imc2000.htm' },
  { models: ['IM C3000', 'IM C3500'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/apc/model/imc3000/imc3000.htm' },
  { models: ['IM C4500', 'IM C6000'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/imc4500/imc4500.htm' },
  { models: ['IM C5500'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re1/model/imc4500/imc4500.htm' },
  { models: ['IM C2010', 'IM C2510'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re2/model/imc2010/imc2010.htm' },
  { models: ['IM C3010', 'IM C3510'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/imc3010/imc3010.htm' },
  { models: ['IM C4510', 'IM C6010'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/imc4510/imc4510.htm' },
  { models: ['IM C5510'], url: 'https://support.ricoh.com/bb/html/dr_ut_e/re2/model/imc4510/imc4510.htm' },
];
const models = [...new Set([
  ...modelDriverPages.flatMap(entry => entry.models),
  'IM C2000', 'IM C2500', 'IM C3000', 'IM C3500', 'IM C4500', 'IM C5500', 'IM C6000',
  'IM C2010', 'IM C3010', 'IM C4510', 'IM C6010', 'MP C2004', 'MP C3004', 'MP C3504',
  'MP C4504', 'MP C6004', 'MP 2555', 'MP 3055', 'MP 3555', 'MP 4055', 'MP 6055',
])].sort();
document.querySelector('#models').replaceChildren(...models.map(model => {
  const option = document.createElement('option');
  option.value = model;
  return option;
}));

function showModel(rawModel, updateHistory = true) {
  const model = rawModel.trim().replace(/\s+/g, ' ').toUpperCase();
  if (!model) {
    modelInput.focus();
    return;
  }
  modelInput.value = model;
  detailTitle.innerHTML = `RICOH <span>${escapeHTML(model)}</span>`;
  const driverPage = resolveDriverPage(model);
  detailDriverLink.href = driverPage || officialDriverPage;
  detailDriverLink.innerHTML = `${driverPage ? `Open ${escapeHTML(model)} driver page` : 'Open Ricoh driver catalog'} <span>↗</span>`;
  driverPageDescription.innerHTML = driverPage
    ? `Open the official Ricoh support page for <strong>${escapeHTML(model)}</strong>. Choose Windows 10/11, then download the PCL 6 driver.`
    : `Open Ricoh’s catalog, choose <strong>${escapeHTML(model)}</strong> and your Windows version, then download PCL 6.`;
  const useManualWindowsInstall = isLegacyModel(model);
  const installSteps = useManualWindowsInstall ? legacyInstructions(model) : installerInstructions(model);
  manualList.innerHTML = installSteps.map((step, index) => renderStep(step, index, useManualWindowsInstall)).join('');
  document.querySelector('.manual .section-head h2').textContent = 'Follow these steps in order';
  document.querySelector('.manual .step-count span').textContent = `${installSteps.length} SCREENSHOTS`;
  document.querySelector('.manual .section-head p').textContent = useManualWindowsInstall
    ? 'Step 1 downloads the driver. Then follow the screenshots for Windows Add Printer.'
    : 'Step 1 downloads the driver. Then follow Ricoh’s setup screens to install it.';
  document.querySelector('.network h2').textContent = useManualWindowsInstall ? 'Need the printer IP address?' : 'Printer not found by setup?';
  document.querySelector('.network p').innerHTML = useManualWindowsInstall
    ? 'On the printer, open <strong>User Tools / Settings → System Settings → Interface Settings</strong> to find its IPv4 address. Enter that address when Windows asks for the printer’s TCP/IP address.'
    : 'On the printer, open <strong>User Tools / Settings → System Settings → Interface Settings</strong> to find its IPv4 address. Return to Ricoh’s setup program and use its manual search option to enter that address.';
  document.title = `Ricoh ${model} Driver Setup`;
  homeView.hidden = true;
  detailView.hidden = false;
  networkGuide.hidden = false;
  const modelHash = `#${encodeURIComponent(model.toLowerCase().replaceAll(' ', '-'))}`;
  if (updateHistory && location.hash !== modelHash) history.pushState({ model }, '', modelHash);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function isLegacyModel(model) {
  return /^MP\s+2500\b/.test(model) || /^MP\s+C\d{3}[12]\b/.test(model);
}

function resolveDriverPage(model) {
  const normalized = model.replace(/^(?:(?:RICOH|AFICIO)\s+)+/, '');
  return modelDriverPages.find(entry => entry.models.includes(normalized))?.url;
}

function legacyInstructions(model) {
  return [
    ['Start the Ricoh driver extractor', 'Run the downloaded driver package. Confirm the listed model and Windows version match your printer, then select Next.', 1],
    ['Accept the license agreement', 'Choose “I accept the agreement” and select Next to continue.', 2],
    ['Choose where to extract the files', 'Select a destination folder for the driver files, or keep the suggested location, then continue.', 3],
    ['Browse to a destination folder', 'In the folder picker, choose a location you can find again, such as the suggested folder on the C: drive, and confirm it.', 4],
    ['Confirm the extraction location', 'Check the destination shown in the installer and select Next.', 5],
    ['Wait for extraction to finish', 'When extraction completes, select OK or Finish. Keep the extracted folder; Windows will need its files.', 6],
    ['Open Windows Settings', 'Open Settings from the Start menu.', 7],
    ['Open Bluetooth & devices', 'In Settings, select Bluetooth & devices.', 8],
    ['Open Printers & scanners', 'Select Printers & scanners to manage installed printers.', 9],
    ['Start adding a printer', 'Select Add device. If Windows does not find your printer, choose the manual add option.', 10],
    ['Choose manual setup', 'Select Add manually to open the classic Add Printer wizard.', 11],
    ['Add a printer with manual settings', 'Choose “Add a local printer or network printer with manual settings,” then select Next.', 12],
    ['Choose a TCP/IP port', 'For a network printer, select “Create a new port” and choose Standard TCP/IP Port. For USB, select the existing USB port instead.', 13],
    ['Enter the printer IP address', 'Type the Ricoh machine’s IPv4 address and continue. The screenshot shows an example address; use the address for your own machine.', 14],
    ['Open Have Disk', 'On the driver selection page, select Have Disk to use the driver files you extracted.', 15],
    ['Browse for the driver file', 'Select Browse in the Install From Disk dialog.', 16],
    ['Open the extracted driver folder', 'Browse to the destination folder you chose during extraction. In this example, the folder is directly under C:.', 17],
    ['Open the DISK1 folder', 'Open the extracted driver folder, then open DISK1.', 18],
    ['Select OEMSETUP.INF', 'Choose OEMSETUP.INF in DISK1 and select Open.', 19],
    ['Confirm the selected driver folder', 'Confirm the folder shown in the Install From Disk dialog, then select OK.', 20],
    ['Select your Ricoh PCL 6 model', `Choose the PCL 6 driver matching ${model} in the list, then select Next. The screenshot shows a different model as an example.`, 21],
    ['Name the printer', `Keep the suggested ${model} PCL 6 name or enter a name you recognize, then continue.`, 22],
    ['Wait for Windows to install it', 'Wait while Windows copies the driver and adds the printer.', 23],
    ['Choose printer sharing', 'Select “Do not share this printer” for a typical personal or office workstation, then continue.', 24],
    ['Finish and print a test page', 'Complete the wizard. Select Print a test page to check the connection and driver.', 25],
  ].map(([title, description, image]) => ({ title, description, image }));
}

function installerInstructions(model) {
  return [
    ['Extract the downloaded driver', 'Open the Ricoh self-extracting driver file. Confirm the destination folder and select Install to unpack the files and start setup.', 1],
    ['Approve the Windows security prompt', 'Check that the publisher is RICOH COMPANY, LTD., then select Yes to allow the driver installer to run.', 2],
    ['Accept the license agreement', 'Review the license, select Agree and Go to Next, then continue through the setup screens.', 3],
    ['Choose the setup method', 'Select Network for a printer connected to your office network, or USB when the printer is directly connected by cable. Select Next.', 4],
    ['Select your printer', 'Choose your Ricoh machine from the discovered device list and select Next. If it is not listed, use manual search or enter its IP address.', 5],
    ['Wait while the driver installs', 'The Ricoh setup program installs the selected printer driver. Keep the installer open until it finishes.', 6],
    ['Review optional Device Software Manager', 'Device Software Manager is optional. Leave its checkbox clear if you only want the printer driver, then select Next.', 7],
    ['Finish and test the printer', 'Review the completed installation, select the installed printer and print a test page. Select Finish to close setup.', 8],
  ].map(([title, description, image]) => ({ title, description, image }));
}

function renderStep(step, index, legacy) {
  const folder = legacy ? 'installer-old' : 'installer-exe';
  const number = String(step.image);
  const src = `assets/${folder}/step-${number}.png`;
  return `<details class="manual-step"${index === 0 ? ' open' : ''}><summary><span class="manual-no">${String(index + 2).padStart(2, '0')}</span><span class="manual-step-title"><strong>${escapeHTML(step.title)}</strong><small>View instructions and screenshot</small></span><span class="manual-step-toggle" aria-hidden="true">+</span></summary><div class="manual-step-content"><p>${escapeHTML(step.description)}</p><a class="step-image-link" href="${src}" target="_blank" rel="noreferrer" aria-label="Open larger screenshot for ${escapeHTML(step.title)}"><img class="step-image" src="${src}" alt="Ricoh installation screenshot: ${escapeHTML(step.title)}" loading="lazy"></a><span class="image-hint">Select the screenshot to view it larger.</span></div></details>`;
}

function showHome(updateHistory = true) {
  detailView.hidden = true;
  networkGuide.hidden = true;
  homeView.hidden = false;
  document.title = 'Ricoh MFP Setup Guide';
  if (updateHistory && location.hash) history.replaceState({}, '', location.pathname + location.search);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('popstate', () => {
  const modelFromHash = decodeURIComponent(location.hash.slice(1)).replaceAll('-', ' ').trim();
  if (modelFromHash) showModel(modelFromHash, false);
  else showHome(false);
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

const popularGrid = document.querySelector('#popular-grid');
popularModels.forEach((model, index) => {
  const button = document.createElement('button');
  button.className = 'model-card';
  button.type = 'button';
  button.innerHTML = `<span class="model-card-icon">${index < 3 ? '▤' : '▥'}</span><span class="model-card-name">${model}</span><span class="model-card-arrow">↗</span>`;
  button.addEventListener('click', () => showModel(model));
  popularGrid.append(button);
});

document.querySelector('#search-button').addEventListener('click', () => showModel(modelInput.value));
modelInput.addEventListener('change', () => {
  if (modelInput.value.trim()) showModel(modelInput.value);
});
modelInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') showModel(modelInput.value);
});
document.querySelector('#back-button').addEventListener('click', showHome);
document.querySelectorAll('a.brand').forEach(brand => brand.addEventListener('click', event => {
  event.preventDefault();
  showHome();
}));
detailDriverLink.href = officialDriverPage;
networkGuide.hidden = true;

const initialModel = decodeURIComponent(location.hash.slice(1)).replaceAll('-', ' ').trim();
if (initialModel) showModel(initialModel, false);
