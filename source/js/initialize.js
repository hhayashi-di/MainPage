// ****************
// Web HuTime Main Page
// Copyright (c) Tatsuki Sekino 2018-2020. All rights reserved.
// ****************

// **** 各種設定 ****
let hutime;
let mainPanelCollection;

let opStatus = 0;       // 現在の操作状態
const opNull = 0;       // 操作なし
const opMenuBar = 1;    // メニューバー操作中
const opTreeMenu = 2;   // レイヤツリーのコンテキストメニュ操作中
//const opDialog = 4;     // ダイアログ操作中

let mouseXOrigin = -1;          // マウス操作用の汎用変数（操作開始時の座標）
let mouseYOrigin = -1;

const selectedBranchColor = "#ffffcc";     // 選択中のツリー項目の色
const minLayerTreeWidth = 100;  // ツリーの最小幅
const minHuTimeMainWidth = 150; // メインパネルの最小幅
const minHuTimeMainHeight = 50; // メインパネルの最小幅
const HuTimeBackgroundColor = "#cccccc";    // メインパネルの背景色

const NewLayerVBreadth = 150;           // 新規作成レイヤの既定の高さ
const PanelTitleVBreadth = 20;          // パネルタイトルの高さ
//const NewLayerScaleVBreadth = 50;    // 新規作成レイヤのスケールの既定の高さ

function initialize () {    // 全体の初期化
    hutime = new HuTime("hutimeMain");
    mainPanelCollection = new HuTime.PanelCollection(document.getElementById("hutimeMain").clientHeight);
    mainPanelCollection.style.backgroundColor = HuTimeBackgroundColor;
    hutime.appendPanelCollection(mainPanelCollection);
    hutime.redraw();

    initMenu();
    initTree();
    initTreeMenu();
    document.getElementById("borderStatusBar").addEventListener("mousedown", borderStatusMouseDown);
    document.getElementById("borderTree").addEventListener("mousedown", borderTreeMouseDown);
    initDialog();

    appendTimeScale("101.1");

    // 現在の前後1年を表示
    let begin = new Date(Date.now());
    begin.setFullYear(begin.getFullYear() - 1);
    let end = new Date(Date.now());
    end.setFullYear(end.getFullYear() + 1);
    hutime.redraw(HuTime.isoToJd(begin.toISOString()), HuTime.isoToJd(end.toISOString()));


    importRemoteJsonContainer("http://localhost:63342/WebHuTimeIDE/MainPage/debug/sample/LineChartPanel.json")
}
