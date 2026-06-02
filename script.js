const dateInput = document.getElementById("dateInput");
const customerInput = document.getElementById("customerInput");
const projectInput = document.getElementById("projectInput");
const typeSelect = document.getElementById("typeSelect");
const versionInput = document.getElementById("versionInput");
const extensionSelect = document.getElementById("extensionSelect");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const output = document.getElementById("output");
const message = document.getElementById("message");

const DEFAULT_VERSION = "V1.0";
const PLACEHOLDER_TEXT = "请填写信息后生成文件名";

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function setPlaceholder() {
  output.textContent = PLACEHOLDER_TEXT;
  output.classList.add("placeholder");
}

function cleanFilePart(value) {
  return value.trim().replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "");
}

function generateFileName() {
  const date = dateInput.value || getTodayString();
  const customer = cleanFilePart(customerInput.value);
  const project = cleanFilePart(projectInput.value);
  const fileType = typeSelect.value;
  const version = cleanFilePart(versionInput.value) || DEFAULT_VERSION;
  const extension = extensionSelect.value;

  if (!customer && !project) {
    showMessage("请填写客户名称和项目名称", true);
    output.focus();
    return "";
  }

  if (!customer) {
    showMessage("请填写客户名称", true);
    output.focus();
    return "";
  }

  if (!project) {
    showMessage("请填写项目名称", true);
    output.focus();
    return "";
  }

  const fileName = `${date}_${customer}_${project}_${fileType}_${version}.${extension}`;
  output.textContent = fileName;
  output.classList.remove("placeholder");
  showMessage("文件名已生成。");
  return fileName;
}

async function copyResult() {
  const text = output.classList.contains("placeholder") ? "" : output.textContent.trim();

  if (!text) {
    showMessage("请先生成文件名，再复制结果。", true);
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showMessage("已复制");
  } catch (error) {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = text;
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    document.execCommand("copy");
    document.body.removeChild(temporaryInput);
    showMessage("已复制");
  }
}

function clearForm() {
  customerInput.value = "";
  projectInput.value = "";
  versionInput.value = DEFAULT_VERSION;
  typeSelect.value = "测试数据";
  extensionSelect.value = "xlsx";
  dateInput.value = getTodayString();
  setPlaceholder();
  showMessage("");
  customerInput.focus();
}

dateInput.value = getTodayString();
setPlaceholder();

generateBtn.addEventListener("click", generateFileName);
copyBtn.addEventListener("click", copyResult);
clearBtn.addEventListener("click", clearForm);
