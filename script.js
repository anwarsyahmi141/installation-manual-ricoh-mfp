const homeView = document.querySelector('#home-view');
const detailView = document.querySelector('#detail-view');
const modelInput = document.querySelector('#model');
const detailTitle = document.querySelector('#detail-title');
const modelNote = document.querySelector('#detail-model-note');
const networkGuide = document.querySelector('.network');
const manualList = document.querySelector('.manual-list');
const models = ['IM C2000', 'IM C2500', 'IM C3000', 'IM C3500', 'IM C4500', 'IM C5500', 'IM C6000', 'IM C2010', 'IM C3010', 'IM C4510', 'IM C6010', 'MP C2004', 'MP C3004', 'MP C3504', 'MP C4504', 'MP C6004', 'MP 2555', 'MP 3055', 'MP 3555', 'MP 4055', 'MP 6055'];
const popularModels = ['IM C3500', 'IM C3000', 'IM C4500', 'MP C4504', 'MP C3004', 'MP 3555'];
const officialDriverPage = 'https://www.ricoh-ap.com/downloads/driver-for-office-solutions';

function showModel(rawModel) {
  const model = rawModel.trim().replace(/\s+/g, ' ').toUpperCase();
  if (!model) {
    modelInput.focus();
    return;
  }
  modelInput.value = model;
  detailTitle.innerHTML = `RICOH <span>${escapeHTML(model)}</span>`;
  modelNote.textContent = model;
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
  history.replaceState({ model }, '', `#${encodeURIComponent(model.toLowerCase().replaceAll(' ', '-'))}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function isLegacyModel(model) {
  return /^MP\s+2500\b/.test(model) || /^MP\s+C\d{3}[12]\b/.test(model);
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

function showHome() {
  detailView.hidden = true;
  networkGuide.hidden = true;
  homeView.hidden = false;
  document.title = 'Ricoh MFP Setup Guide';
  history.replaceState({}, '', location.pathname + location.search);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
modelInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') showModel(modelInput.value);
});
document.querySelector('#back-button').addEventListener('click', showHome);
document.querySelectorAll('a.brand').forEach(brand => brand.addEventListener('click', event => {
  event.preventDefault();
  showHome();
}));
document.querySelector('#detail-driver-link').href = officialDriverPage;
networkGuide.hidden = true;

const initialModel = decodeURIComponent(location.hash.slice(1)).replaceAll('-', ' ').trim();
if (initialModel) showModel(initialModel);
