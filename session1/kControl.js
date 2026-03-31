var jsVersion = "2.1.7";	// Oct 15th, 2007
var Country = "US"; // default
var g_iUseSAGlossary = 0; // use StandAlone or regular glossary
var debugOn = 0; // debug on/off (can't set console to non-null)
var progressUpdate = 0; // update/don't
var progressTest = 0; // window for progress (testing)
var LANflag = 0;
var g_iTestCM = 0; // CM for test questions
var flashDebug = 0;
var repeatMode = 0; // repeat the kp once (demo mode)
var testIncorrect = 0; // test incorrect (demo mode)
var skipPA = 0; // skip practice (for demo mode at present)
var k_demoMode = 1;
var k_runMode = 2;
var flashMode = k_runMode; // 1 demo, 2 run
//var flashMode = k_demoMode; // 1 demo, 2 run
var g_bWriteDemoData = 0; // write demo data to file?
var g_bPauseReturn = 1; // pause on return from tools e.t.c.
var g_strTableHeight = "100%"; // height (used for "embed" browser height in LRM format)

var b_GotoPreview = 0; // preview for goto
var audioquality = 1; // default audio quality (2 = higher)
var macIEOff = 0; // disable IE on mac?
var dynParVersion = 1;
var g_bUseTestOptions = 1; // read teacher options from file (options.txt in session folder)
//var g_bCSRTE = 0; // are we running in CS RunTimeEnv (this will be set when CS content is generated)

var g_iUseLMS = 0;	// flag of existence LMS
// the ___API___ token shall be replaced with the LMSAPI.asp URL by installer
// example for Stand-alone version (with MiniMe)- 
// var g_sLMSAPI_URL = "http://"+location.host+"/Riverdeep/LMS/API/LMSAPI.ASP";
var g_sLMSAPI_URL = "/servlet/LegacyContentListener";
var g_sRedirect_URL = ""; // URL required to redirect user to other LMS page on exit from Menu
var g_TestProg_URL = "http://dmxserver/cgi-bin/CGIParse.exe";

if (typeof g_strDynamoSessionID == "undefined")
	g_strDynamoSessionID = "";
if (typeof g_iDynamoUserID == "undefined")
	g_iDynamoUserID = "";

// default for launch from Menu
var UserID = 0;
if (typeof tutorialName == "undefined")
	tutorialName = "";
if (typeof ActivityType == "undefined")
	ActivityType = "";
if (typeof ActivityID == "undefined")
	ActivityID = "0";
if (typeof AssignmentID == "undefined")
	AssignmentID = 0;
if (typeof AtomID == "undefined")
	AtomID = "";
if (typeof Keypress == "undefined")
	Keypress = 0;
if (typeof g_bCSRTE == "undefined")
	g_bCSRTE = 0;
if (typeof g_bSinglePA == "undefined")
	g_bSinglePA = 0;
if (typeof g_bHideExit == "undefined")
	g_bHideExit = 0;
if (typeof g_bDisableStartEndBlock == "undefined")
	g_bDisableStartEndBlock = 0;

// for PA testing:
var PADisabled = 0; 
var testSessionID = "aq1sw2de3";
var testUser = "NB004";
var PAReturnURL = "http://www.nebula.ie";
var useTestVals = 0;
////////**************
var putProductStatus = 4;
var fetchProductStatus = 5;
var fetchProductPrefs = 7;
////////**************

var g_bSCORM = 0; // automatic detection
var g_iScormType = -1;
var g_bSCORMOff = 1; // force SCORM to be off regardless of interface detection

var g_bDisableContinue = 0; // disable continue button (will be set to 1 if Assignment mode)
var g_bTestAssign = 0; // set this if you want to test content in assignment mode

var InternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
var MacPlatform = navigator.platform == "MacPPC";
var vers = navigator.appVersion;
vers = eval(vers.substring(0,1)); 
// convert all characters to lowercase to simplify testing
var agt=navigator.userAgent.toLowerCase();
var appVer = navigator.appVersion.toLowerCase();
var is_safari = ((agt.indexOf('safari')!=-1)&&(agt.indexOf('mac')!=-1))?true:false;


var _console = null;
var exploreWindow = null;
var PAWindow = null;
var sessionWindow = null;
var glossaryWindow = null;
var calculatorWindow = null;
var manipWindow = null;
var folderCount = 6; // num folders to root
var k_loadDelay = 180; // timeout
var KPReadAhead = (InternetExplorer && ! MacPlatform) ? 9 : 1;
var callbackKP = 1;
var PAInLayer = 0; // PA in layer/window for IE  
var startTime = new Date();
var relativeRoot = "../../../../../";
var relativeCourse = "../../../../";
var explorePath = relativeRoot+"explore.html";
var PAPath = "http://asmt.riverdeep.net/riverdeep/classes/PAreaInterfaceController"; //////////// change when have real path
var parsePAString = 1; // parse PA string (from BID)
var taskBarHeight = 55; // for netscape 
var TOTLimit = 240; // time on task
var useKPWindow = 1; // use KP window for relative sizes (explorations)
///// relative sizes to KP window: //
var leftStart = 0.9;  // 10 pixels
var topStart = 6.75;  // percentage
var interfaceWidth = 10.3;  // width of right side of interface (%)
var interfaceHeight = 18.5;
var movieWidth = 640;
var movieHeight = 480;
var netscapeBorderWidth = 5; // window border (explorations)
var IEMacOffsetWidth = 15;
var IEMacOffsetHeight = 25;
var dragBarHeight = 20;
// window position (navigator only)
var currentWindowTop = 0;
var currentWindowLeft = 0;
var exploreRelX = 0; // relative x position (exploration)
var exploreRelY = 0;

var Score = 4;  // score from dynamic pars
var g_iPcmpt = 0;    // percent done from dynamic pars
var asgnid = 0;
var prod = "d1";
var ppath = "";
var NumQuestions = 5; // default for unit practice
var g_szParList = ""; // parameter list for manipulative window

////////////////////// flash plug-in detection /////////////////////////////////////////

var g_iFlashVerRequired = 5;			// minimum version required

var downLoadPromptPage = "download.html";	// send user to Macromedia
var downLoadURL = (typeof menuName != "undefined") ? ("../" + downLoadPromptPage) : (relativeRoot + downLoadPromptPage);


var g_bVerCorrect = false; // is the correct version (or above) installed?
var g_bFlashMin6 = false; // is version 6 or above installed? (if this is true then use "FlashVars" parameter)

var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false;

if(isIE && isWin)
{
	// purpose is to set the g_bFlashVerMin6 boolean for IE/PC
	// if plug-in installed is at least 6, then both g_bFlashVerMin5 and g_bFlashVerMin5 will be set to true
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
	document.write('on error resume next \n');
	document.write('g_bVerCorrect = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.');
	document.write(g_iFlashVerRequired);
	document.write('")) \n');	
	document.write('g_bFlashMin6 = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6")) \n');	
	document.write('</SCR' + 'IPT\> \n'); // break up end tag so it doesn't end our script
}


function detectFlash()
{	
	// purpose is to set the g_bFlashVerMin5 an 6 booleans for NS and IE/Mac
	// use javascript detection using navigator.plugins array
	if(navigator.plugins && navigator.plugins["Shockwave Flash"])
	{
		var flashDescription = navigator.plugins["Shockwave Flash"].description;

		// plugin-description looks like 'Shockwave Flash 5.0 r5'
		// get the major version
		var descArray = flashDescription.split(" ");
		var tempArrayMajor = descArray[2].split(".");
		var majorVersion = parseInt(tempArrayMajor[0]);

		g_bVerCorrect = (majorVersion >= g_iFlashVerRequired);
		g_bFlashVerMin6 = (majorVersion >= 6);
		
	}
	if (! g_bVerCorrect)
		DownLoadPrompt();

}

function DownLoadPrompt()
{
	if(! g_bVerCorrect)
	{
		window.location = downLoadURL;
	}
}

detectFlash();


///////////////////////////////// end plug-in version detection /////////////////////////////////////////


function getCourse()
{
	return removeName(self.location.href).substr(0,4);

}

function generateLayers()
{
}
function positionExplore()
{
}
function focusExplore()
{
}
function closeExploreWin()
{
}
function getWindowHeight() // can't get browser dimensions with IE so assume full screen:
{
	return (InternetExplorer ? screen.availHeight : (screen.height)-taskBarHeight);
}
function getWindowWidth()
{
	return (InternetExplorer ? screen.availWidth : screen.width); 
}
function getWindowLeft()
{ // (need this and windowTop before window is open so simply return 0)
	return 0; 
}
function getWindowTop()
{
	return 0; 
}
function currentLeft()
{
	return InternetExplorer ? 0 : window.screenX;
}
function currentTop()
{
	return InternetExplorer ? 0 : window.screenY;
}

function openDebugWnd()
{
   if (InternetExplorer && debugOn)
   { // open wnd first time call this function, or after existing closed
	if ((_console == null) || (_console.closed)) {
		_console = window.open("", "console", "width=600,height=300,resizable,scrollbars");
		_console.document.open("text/plain");
	}
   }
}
function debug(msg)
{
   if(InternetExplorer && debugOn)
   { // open wnd first time call this function, or after existing closed
	if ((_console == null) || (_console.closed)) {
		return;
	}
	_console.document.writeln(msg);
   }
}
function closeWindow()
{ //need this till solve problem of window close in netscape
	//updateProgress();
	progressUpdate = 0;
	window.close();
}

function EncodeChars(in_str)
{
// not ideal! what we really want is to urlencode the string
// encoding "/" and space here
	var objString = new String(in_str);
	var strReturn = "";
	var iLength = objString.length;
	while (iLength >= 0)
	{
		if(objString.substr(iLength,1) == " ")
		{
			strReturn = "%20" + strReturn;
		}
		else if(objString.substr(iLength,1) == "/")
		{
			strReturn = "%2F" + strReturn;
		}
		else
			strReturn = objString.substr(iLength,1) + strReturn;
		iLength--;
	}

	return strReturn;
}

function updateProgress()
{
	closeGlossary();
	//closeCalculator();
	closeManip();
	if(g_bSCORM)
	{

		kControl_DoFSCommand("LMSFinish", "");
	}
}
function getWOPerc(highestKP,totalKPs)
{
	var iPcmpt = 0;

	if (highestKP > 0)
		iPcmpt = Math.round((highestKP/totalKPs)*100);

	if (iPcmpt < g_iPcmpt)
	{
		iPcmpt = g_iPcmpt;
	}
	else
	{
		g_iPcmpt = iPcmpt;
	}
	return iPcmpt;
}
function getDynPars(theType,atomID,resumeKP,highestKP,totalKPs,theScore,theAtt)
{
	var dParamObj = "";
	var iPcmpt = 0;
	dParamObj = dParamObj+"prod="+prod+";ID="+atomID+";KP="+resumeKP;
	if (theType == "W")
	{
		iPcmpt = getWOPerc(highestKP,totalKPs);

		dParamObj = 	dParamObj+";S="+theScore+";att="+theAtt+";pcmpt="+iPcmpt;		
	}
	return dParamObj;
}
function loadNextSession(URL)
{
	progressUpdate = 0; // don't want progress update onUnload

	if(flashMode == 1) // demo
	{
		URL = URL + "?flashMode=1";
		if(repeatMode == 1)
			URL = URL + "&kprepeat=1";
		if(testIncorrect == 1)
			URL = URL + "&testIncorrect=1";
		if(skipPA == 1)
			URL = URL + "&skipPA=1";
		if(g_bWriteDemoData == 1)
			URL = URL + "&g_bWriteDemoData=1";
		
	}

	if (!InternetExplorer)
	{
		var thePath = self.location;
		//self.location.href = getSession(thePath) + URL;
		// the above caused problems with Safari and Netscape v7 and above.
		// The above fix was for some early versions of netscape, but we have since
		// been unable to repro the problem. The code below has been tested on several platforms
		self.location.href = URL;
	}
	else
		self.location.href = URL;
}

function sendInfo(type, bid, rkp, hkp, tkp, ns, is, s, att, in_bLastUpdate, in_strNextSessionURL, sessionNumber, openPar)
{ // last three vars for PA (can't issue two GETURL at same level)
	doProgress(type, bid, rkp, hkp, tkp, ns, is, s, att, in_bLastUpdate, in_strNextSessionURL);
}


// to use with new LMSAPI functionality
//=====================================
function processInfo(in_bLastUpdate, in_strNextSessionURL, in_iUseLMS, in_iLMSOptions)
{
	//alert("processInfo("+in_bLastUpdate+", "+in_strNextSessionURL+", "+in_iUseLMS+", "+in_iLMSOptions+");");
	if (in_strNextSessionURL)
	{
		loadNextSession(in_strNextSessionURL);
	}
	else if (in_bLastUpdate)
	{
		if (in_iUseLMS == 1)
		{
			// load new content for this window,
			// for example, "http://arcas/riverdeep/lms/api/lmsapi.asp?ACTIONTYPE=1&USERID=3&ASSIGNID=43&ISTEST=0&FL=0"
			if (in_iLMSOptions == 0)
			{
				// Exit button pressed in CM
				self.location.href = g_sLMSAPI_URL+"?ACTIONTYPE=1&USERID="+UserID+"&ASSIGNID="+AssignmentID+"&ISTEST=0&FL=0";
			}
			if (in_iLMSOptions == 1)
			{
				// Assignment finished in CM
				self.location.href = g_sLMSAPI_URL+"?ACTIONTYPE=1&USERID="+UserID+"&ASSIGNID="+AssignmentID+"&ISTEST=0&FL=1";
			}
			if (in_iLMSOptions == 2)
			{
				// Exit from Menu
				self.location.href = g_sRedirect_URL;
			}
		}
		else if (! MacPlatform || ! InternetExplorer)
		{
			closeWindow();
		} // otherwise CM closes the window
	}
}
function closeAllWindows()
{
	closeGlossary();
	closeCalculator();
	closeManip();
	closeWindow();
}

function doProgress(type,bid,rkp,hkp,tkp,ns,is,s,att,in_bLastUpdate,in_strNextSessionURL)
{ // need in_bLastUpdate for netscape (can't update then close window).
// in_strNextSessionURL needed here rather than in osker to allow
// pars to update properly (if call doProgress then go next session,
// onUnload issued before prog updated (delaying doesn't help)
	var Pcmpt = 0;
	var TOT = 0;
	var Actid = "";
	var dynPars = getDynPars(type,bid,rkp,hkp,tkp,s,att);
	var postString = "";
	var progURL = "";
	if (! InternetExplorer)
		closeExploreWin();

	if (progressUpdate)
	{
		TOT = Math.round(getTOT());
		if (TOT < 1)
			TOT = 1 // always show some TOT
		else if (TOT > TOTLimit)
			TOT = TOTLimit;
		if (type == "T")
		{
			Actid = ActivityID;

			// note: "is/ns" not "(is-1)/ns"
			Pcmpt = Math.round((is/ns + (hkp/tkp)/ns)*100);
			if (Pcmpt == 0)
				Pcmpt = 1; // always show some percentage
		}
		else
		{
			if (AssignmentID != 0)
				Actid = ActivityID
			else
				Actid = bid;
 			if (type == "W")
			{
				Pcmpt = getWOPerc(hkp,tkp);

			}
			else // screen/summary:
				Pcmpt = Math.round((hkp/tkp)*100);	
		}
		if (LANflag == 1)
		{
			updateLANProgress (Actid, bid, rkp, hkp, tkp, s, ns, is, in_bLastUpdate);
		}
		else
		{
			//var progURL = g_sLMSAPI_URL+"?ACTIONTYPE="+putProductStatus+"&USERID="+UserID+"&ASSIGNID="+AssignmentID+"&ACTID="+Actid+"&TOT="+TOT+"&PERCDONE="+Pcmpt+"&XPROG="+dynPars;
			
			if (progressTest)
			{ // for testing 
				progURL = g_TestProg_URL+"?ACTIONTYPE="+putProductStatus+"&USERID="+UserID+"&ASSIGNID="+AssignmentID+"&ACTID="+Actid+"&TOT="+TOT+"&PERCDONE="+Pcmpt+"&XPROG="+dynPars;
				var winProperties = "top=50,left=50,height=400,width=800,menubar=no,status,scrollbar=yes";
				var updateWindow=window.open(progURL, "updateWin", winProperties);
				updateWindow.focus();
			}
			else
			{
				progURL = g_sLMSAPI_URL+"?ACTIONTYPE="+putProductStatus+"&USERID="+UserID+"&ASSIGNID="+AssignmentID+"&ACTID="+Actid+"&TOT="+TOT+"&PERCDONE="+Pcmpt+"&XPROG="+dynPars;
				sendProgress(progURL);
			}
		}
	}
	if (in_strNextSessionURL)
	{
		loadNextSession(in_strNextSessionURL);
	}
	else if (in_bLastUpdate)
	{
		closeGlossary();
		closeCalculator();
		closeManip();
		closeWindow();
	}
}
function getSession(thePath)
{
	var theString = new String(thePath);
	var theLength = theString.length;
	while (theLength > 0 && theString.substr(theLength-1,1) != "/")
	{
		theLength = theLength - 1;
	}
	var theSession = new String(theString.substr(0,theLength));
	return theSession
}
function removeName(fullPath)
{
	var theString = new String(fullPath);
	var theLength = theString.length;
	var folderIndex = 0;
	var thePath = new String();
	var iNumFolders = folderCount;

	if (ActivityType == "U")
		iNumFolders--;
	while (theLength > 0 && folderIndex < iNumFolders)
	{
		if (folderIndex != 0)
		{
			thePath = theString.substr(theLength-1,1) + thePath;
		}
		if (theString.substr(theLength-1,1) == '/')
		{
			folderIndex = folderIndex + 1;
		}
		theLength = theLength - 1;
	}
	if (theLength == 0)
		showError('sessionPath incorrect: ' + fullPath);
	return thePath.substr(1);
}

function removePath(theName)
{
	var theLength = theName.length;
	while (theLength > 0 && theName.substr(theLength-1,1) != '/')
	{
		theLength = theLength - 1;
	}
	return theName.substring(theLength);
}
function loadLayer(URL, layerObj, checkFilled)
{ // if checkfilled true then only load exploration if not already filled
	if(InternetExplorer)
	{
		if (! checkFilled || (layerObj.location.href == "about:blank"))
		{
			layerObj.location.href = URL;
			
		}
	}
	else
		layerObj.src = URL;
}
function sendProgress(ProgressPath)
{ 
	var theLayerObj = InternetExplorer ? progressFrame : document.dummyProgress;
	loadLayer(ProgressPath, theLayerObj);
}

function showError(theName)
{
	alert(theName);
	closeWindow();
}


function sendToLoad(theIndex, subIndex, in_strSessionKPRefs)
{
	
	var theKP = parseInt(theIndex);
	var theSubIndex = parseInt(subIndex);
// increment kpindex here for now:
	//theKP++;
	if (MacPlatform && InternetExplorer)
	{ // the session path is retrieved from the html file
		if(!LANflag)
		{
			var varFile = tutorialName + "var.txt";
			var SessionPath = removeName(document.location);
			var SessionsString = "";
			var strPath = (ActivityType == "U") ? relativeRoot.substring(0, relativeRoot.length - 3) : relativeRoot;
			var fullString = strPath + "stream.html?macIE=1";
			
			if (typeof arSessions != "undefined")
			{

				for (iz = 0; iz < arSessions.length; iz++)
				{

					SessionsString = SessionsString + "&Session"+ (iz + 1) + "=" + arSessions[iz];
				}
				fullString = fullString + "&NumSessions="+arSessions.length+SessionsString+"&unitKPRefs="+in_strSessionKPRefs+"&unitPath="+SessionPath + "/";

			}
			
			
			
			fullString = fullString + "&varFile=" + SessionPath + "/" + varFile + "&k_loadDelay=" + k_loadDelay + "&KPReadAhead=" + KPReadAhead + "&callbackKP=" + callbackKP + "&currentKPIndex=" + theKP + "&iSubMovieIndex=" + theSubIndex + "&SessionPath="+SessionPath + "/&parsePAString="+parsePAString+"&ActivityType="+ActivityType+"&TutorialName="+SessionPath + "/" + tutorialName;

			
			document.streamFrame.location.href = fullString;
		}
	}
	else
	{
		document.loadKPs6.TGotoLabel("/","begin");
		document.loadKPs6.SetVariable("currentKPIndex",theKP);
		document.loadKPs6.SetVariable("iSubMovieIndex",theSubIndex);
		document.loadKPs6.Play();
	}
}
function GetNumFolders(in_strPath)
{
	var ix = 0;
	var iNumFolders = 0;

	while (ix < in_strPath.length && in_strPath.length > 1)
	{
		while (in_strPath.substr(ix,1) == "." && ix < in_strPath.length)
		{
			ix++;
		}
		iNumFolders++;
		ix++;
	}

	return iNumFolders;
}
/*
function kControl_DoFSCommand(command, args) {
  var kControlObj = InternetExplorer ? kControl : document.kControl;
  debug ("kControl_DoFSCommand " + command + " " + args);
  //
	if(command == "sendDebug" && g_bWriteDemoData)
	{
		//alert("hello");
		document.debugSWF.SetVariable("szDebug",args)
		document.debugSWF.TCallLabel("/","writeData");
		
	}


}
*/
function GenerateHTML (flashPath) {// Create Main HTML
	var iz = 1; // counter for sessions in unit practice
	var sessionName = "";

	initVars();
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"')
	document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0"');
	document.write(' ID=kControl WIDTH=100% HEIGHT=100%>\n');

	document.write(' <PARAM NAME=movie VALUE="' + flashPath + '/kControl.swf');
	if(g_bFlashMin6)
	{
		document.write('"> <PARAM NAME=FlashVars VALUE="macIE=0');
	}
	else
	{
		document.write('?macIE=0');
	}


	document.write('&AssignmentID=');
	document.write(AssignmentID);
	if(AssignmentID != 0)
	{
		document.write('&g_bDisableContinue=1');
	}
	else
	{
		document.write('&g_bDisableContinue=');
		document.write(g_bDisableContinue);
	}
	document.write('&debug=');
	if (g_iTestCM)
		document.write(1)
	else
		document.write(flashDebug);
	document.write('&repeatMode=');
	document.write(repeatMode);
	document.write('&theMode=');
	document.write(flashMode);
	document.write('&theScore=');
	document.write(Score);
	document.write('&ActivityType=');
	document.write(ActivityType);
	document.write('&AtomID=');
	document.write(AtomID);
	document.write('&Keypress=');	
	document.write(Keypress);
	document.write('&tutorialName=');
	document.write(tutorialName);
	document.write('&k_loadDelay=');
	document.write(k_loadDelay);
	document.write('&numReadAhead=');
	document.write(KPReadAhead);
	document.write('&numCallback=');
	document.write(callbackKP);
	document.write('&parsePAString=');
	document.write(parsePAString);
	document.write('&LANFlag=');
	document.write(LANflag);
	document.write('&jsVersion=');
	document.write(jsVersion);
	document.write('&b_GotoPreview=');
	document.write(b_GotoPreview);
	document.write('&audioquality=');
	document.write(audioquality);
	document.write('&PADisabled=');
	document.write(PADisabled);
	document.write('&ActivityID=');
	document.write(ActivityID);
	document.write('&g_iUseLMS=');
	document.write(g_iUseLMS);
	document.write('&g_sLMSAPI_URL=');
	document.write(g_sLMSAPI_URL);
	document.write('&UserID=');
	document.write(UserID);
	document.write('&testIncorrect=');
	document.write(testIncorrect);
	document.write('&skipPA=');
	document.write(skipPA);
	document.write('&TestQuestions=');
	document.write(g_iTestCM);
	document.write('&g_bUseTestOptions=');
	document.write(g_bUseTestOptions);

	document.write('&g_bPauseReturn=');
	document.write(g_bPauseReturn);
	
	document.write('&NumFoldersToRoot=');
	document.write(GetNumFolders(flashPath));
	document.write('&NumQuestions=');
	document.write(NumQuestions);
	
	if (typeof arSessions != "undefined")
	{

		for (iz = 0; iz < arSessions.length; iz++)
		{

			document.write('&Session'+(iz+1)+'=');

			document.write(arSessions[iz]);
		}

	}
	document.write('&InternetExplorer=');
	if (InternetExplorer)
		document.write(1)
	else
		document.write(0);
	document.write('&MacPlatform=');
	if (MacPlatform)
		document.write(1)
	else
		document.write(0);
	document.write('&BrowserVersion=');
	document.write(vers);
	document.write('&FlashVersionRequired=');
	document.write(g_iFlashVerRequired);
	document.write('&g_strCountry=');
	document.write(Country);
	document.write('&g_bSCORM=');
	document.write(g_bSCORM);
	document.write('&g_bCSRTE=');
	document.write(g_bCSRTE);
	document.write('&g_bSinglePA=');
	document.write(g_bSinglePA);
	document.write('&g_bHideExit=');
	document.write(g_bHideExit);
	document.write('&g_bDisableStartEndBlock=');
	document.write(g_bDisableStartEndBlock);



	document.write('"><PARAM NAME=loop VALUE=false><PARAM NAME=menu VALUE=false>\n');
	document.write(' <PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#000000>\n');
	document.write(' <EMBED src="'+flashPath+'/kControl.swf');
	if(g_bFlashMin6)
	{
		document.write('"  FlashVars="macIE=0');
	}
	else
	{
		document.write('?macIE=0');
	}

	document.write('&AssignmentID=');
	document.write(AssignmentID);
	if(AssignmentID != 0)
	{
		document.write('&g_bDisableContinue=1');
	}
	else
	{
		document.write('&g_bDisableContinue=');
		document.write(g_bDisableContinue);
	}
	document.write('&debug=');
	if (g_iTestCM)
		document.write(1)
	else
		document.write(flashDebug);
	document.write('&repeatMode=');
	document.write(repeatMode);
	document.write('&theMode=');
	document.write(flashMode);
	document.write('&theScore=');
	document.write(Score);
	document.write('&ActivityType=');
	document.write(ActivityType);
	document.write('&AtomID=');
	document.write(AtomID);
	document.write('&Keypress=');	
	document.write(Keypress);
	document.write('&tutorialName=');
	document.write(tutorialName);
	document.write('&k_loadDelay=');
	document.write(k_loadDelay);
	document.write('&numReadAhead=');
	document.write(KPReadAhead);
	document.write('&numCallback=');
	document.write(callbackKP);
	document.write('&parsePAString=');
	document.write(parsePAString);
	document.write('&LANFlag=');
	document.write(LANflag);
	document.write('&jsVersion=');
	document.write(jsVersion);
	document.write('&b_GotoPreview=');
	document.write(b_GotoPreview);
	document.write('&audioquality=');
	document.write(audioquality);
	document.write('&PADisabled=');
	document.write(PADisabled);
	document.write('&ActivityID=');
	document.write(ActivityID);
	document.write('&g_iUseLMS=');
	document.write(g_iUseLMS);
	document.write('&g_sLMSAPI_URL=');
	document.write(g_sLMSAPI_URL);
	document.write('&UserID=');
	document.write(UserID);
	document.write('&testIncorrect=');
	document.write(testIncorrect);
	document.write('&skipPA=');
	document.write(skipPA);
	document.write('&TestQuestions=');
	document.write(g_iTestCM);
	document.write('&g_bUseTestOptions=');
	document.write(g_bUseTestOptions);
	document.write('&g_bPauseReturn=');
	document.write(g_bPauseReturn);
	document.write('&NumFoldersToRoot=');
	document.write(GetNumFolders(flashPath));
	document.write('&NumQuestions=');
	document.write(NumQuestions);
	if (typeof arSessions != "undefined")
	{

		for (iz = 0; iz < arSessions.length; iz++)
		{

			document.write('&Session'+(iz+1)+'=');

			document.write(arSessions[iz]);
		}

	}
	document.write('&InternetExplorer=');
	if (InternetExplorer)
		document.write(1)
	else
		document.write(0);
	document.write('&MacPlatform=');
	if (MacPlatform)
		document.write(1)
	else
		document.write(0);
	document.write('&BrowserVersion=');
	document.write(vers);
	document.write('&FlashVersionRequired=');
	document.write(g_iFlashVerRequired);
	document.write('&g_strCountry=');
	document.write(Country);
	document.write('&g_bSCORM=');
	document.write(g_bSCORM);
	document.write('&g_bCSRTE=');
	document.write(g_bCSRTE);
	document.write('&g_bSinglePA=');
	document.write(g_bSinglePA);
	document.write('&g_bHideExit=');
	document.write(g_bHideExit);
	document.write('&g_bDisableStartEndBlock=');
	document.write(g_bDisableStartEndBlock);


	document.write('" loop=false menu=false quality=high bgcolor=#000000  WIDTH="100%" HEIGHT="');
	document.write(g_strTableHeight);
	document.write('" swLiveConnect=true');
	document.write(' NAME=kControl TYPE="application/x-shockwave-flash" ');
	document.write('		PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">\n');
	document.write('</EMBED></OBJECT>\n');

	if(flashMode == k_demoMode && g_bWriteDemoData)
	{
		document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="550" height="400" id="debugSWF" align="middle">');
		document.write('<param name="allowScriptAccess" value="sameDomain" />');
		document.write('<param name="movie" value="' + flashPath + '/debug.swf" />');
		document.write('<param name="quality" value="high" />');
		document.write('<param name="bgcolor" value="#ffffff" />');
		document.write('<embed src="'+flashPath+'/debug.swf" quality="high" bgcolor="#ffffff" width="550" height="400" name="debugSWF" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
		document.write('</object>');
		
	}


}
/////////////////// START INIT VARIABLES /////////////////////////
function getArgs(query, separator){
	var args = new Object();
	if (query != null)
	{
		var pairs = query.split(separator);
		for(var i = 0; i < pairs.length; i++){
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var argname = pairs[i].substring (0, pos);
			var value = pairs[i].substring (pos+1);
			args[argname] = unescape (value);
			// document.writeln ("args " + argname + " " + args[argname]);
		}
	}
	return args;	
}
function getTOT()
{
	var stopTime = new Date();
	var diff = (stopTime.getTime() - startTime.getTime())/(1000*60);
	startTime = new Date();
	return diff;
}
function ProblemHeightBrowser()
{
	// needing to add more and more browser/version combinations to run within CS LRM format, so just apply
	// workaround for all browsers within CS LRM format (will apply to embed browsers only since height is only set
	// in that case:
	
	return 1;
}
function getCSHeight()
{

	var iRetVal = 0;
	// HACK!! 100% height does not work within CS3 with LRM format and some embed browsers. So
	// here we're attempting to calculate a height
	// this is really naff but it is what Microsoft do in the LRM env to calculate vertical space, it probably won't work with CS 4!!!!
	// also means activity won't resize properly since height will be constant (may be better to make width constant also?)
	var ecs_windowOverhead = 13+44+28+13;  // nav bars, etc.
	
	if(typeof g_bCSRTE != "undefined")
	{

		if (g_bCSRTE == 1)
		{
			// LRM rather than SCORM
			if (ProblemHeightBrowser())
			{
			
				if (window.innerHeight)
				{
					 iRetVal = (window.innerHeight-ecs_windowOverhead-30);  //NSCP (needs more room)
				}
				else if (document.body && document.body.offsetHeight)
				{ 
					iRetVal = (document.body.offsetHeight-ecs_windowOverhead);  //IE
				}

			}


		}

	}
	return (iRetVal == 0 ? "100%" : new String(iRetVal));
}
function initVars()
{
	if (macIEOff && MacPlatform && InternetExplorer)
	{
		showError("IE on Macintosh not supported at present");
	}
	openDebugWnd();
	g_strTableHeight = getCSHeight();


	if (LANflag == 1){	
		var loc2 = unescape (location);
		var iPos = loc2.indexOf ('?');
		if (iPos < 0)
			return;	// no args
		var argString = loc2.substring(iPos+1, loc2.length);
		var theString = unescape (argString);
		}
		else {
			var theString = unescape (location.search.substring(1));
		}
	
	var args = getArgs (theString,"&");

	if(args.SCORM)
	{
		//alert("USE SCORM");
		g_bSCORM = args.SCORM;
	}

	if(args.relativeRoot)
	{
		relativeRoot = args.relativeRoot == 0 ? "" : args.relativeRoot;
	}
	if(args.relativeCourse)
	{
		relativeCourse = args.relativeCourse == 0 ? "" : args.relativeCourse;
	}

	if (args.USERID)
		UserID = args.USERID;
	if (UserID == 0  && (typeof DynamoUserid != "undefined"))
		UserID = DynamoUserid;
	if (args.ASSIGNID)
		AssignmentID = args.ASSIGNID;
	if (args.ppath)
		ppath = args.ppath;
	if (args.flashMode)
		flashMode = args.flashMode;
	if (args.kprepeat)
		repeatMode = args.kprepeat;
	if (args.testIncorrect)
		testIncorrect = args.testIncorrect;
	if (args.skipPA)
		skipPA = args.skipPA;
	if (args.audioquality)
		audioquality = args.audioquality;
	if (args.country)
		Country = args.country;
	if (args.numquestions)
		NumQuestions = args.numquestions;
	if (args.flashMode)
		flashMode = args.flashMode;
	if (args.g_bWriteDemoData)
		g_bWriteDemoData = args.g_bWriteDemoData;
		
	if (!AssignmentID)
		AssignmentID = 0;	// default for launch from Menu
	if (!ActivityType)
		debug ("ActivityType not defined");	// in HTML
	if (!tutorialName)
		debug ("tutorialName not defined");	// in html
	if (!AtomID)
		AtomID = "";			// Optional, for resume
	if (!Keypress)	
		Keypress = 0;		// Optional, for resume
        if (!Score)
                Score = 0; // not attempted
	if (!g_iPcmpt)
		g_iPcmpt = 0;
	if (typeof dynamoSession == "undefined")
		dynamoSession = "";		// empty session ID (for non Dynamo server)

	// default for launch from Menu - we do not update the product status
	if (AssignmentID == 0)
		g_iUseLMS = 0;

	startTime = new Date();
	if(AssignmentID == 0 && g_bTestAssign)
		AssignmentID = 1;

	if (g_bSCORM || g_bCSRTE)
	{
		g_bHideExit = args.bHideExit ? args.bHideExit : 1;
	}
	
}
function InitVariables()
{
	if(g_bSCORM)
	{
		kControl_DoFSCommand("LMSInitialize", "");
	}
	opener = "";
}
function InitMenuVariables()
{
	if (LANflag == 1) {	
		var loc2 = unescape (location);
		var iPos = loc2.indexOf ('?');
		if (iPos < 0)
			return;	// no args
		var argString = loc2.substring(iPos+1, loc2.length);
		var theString = unescape (argString);
	}
	else {
		var theString = unescape (location.search.substring(1));
	}
	
	var args = getArgs (theString,"&");
	if (args.USERID)
		UserID = args.USERID;
	if (args.RURL)
		g_sRedirect_URL = args.RURL;
	if (g_sRedirect_URL == "")
		g_iUseLMS = 0;
	if (typeof dynamoSession == "undefined")
		dynamoSession = "";		// empty session ID (for non Dynamo server)
}
function openMenuWin(URL)
{
	var theHeight = InternetExplorer ? screen.availHeight : (screen.height)-taskBarHeight;
	var theWidth = InternetExplorer ? screen.availWidth : screen.width;
	var windowProperties = "top=0,left=0,resizable=no,height="+theHeight+",width="+theWidth;
	var fullURL = URL + dynamoSession + "?USERID=" + UserID;
	var menuWindow=window.open(fullURL, "menuWin", windowProperties);
	menuWindow.focus();
}
function closeGlossary()
{
	if (glossaryWindow != null && !glossaryWindow.closed)
		glossaryWindow.close();
}
function closeManip()
{
	if (manipWindow != null && !manipWindow.closed)
		manipWindow.close();
}
function closeCalculator()
{
	if (calculatorWindow != null && !calculatorWindow.closed)
		calculatorWindow.close();
}
function openGlossary()
{
	var strRelativeCourse = (g_bSCORM || g_bCSRTE) ? "" : relativeCourse;
	var strPath = (ActivityType == "U") ? relativeCourse.substring(0, relativeCourse.length - 3) : strRelativeCourse;


	var strSAPath = "../SAGlossHelpFiles/SAGlossary.html?strCourse="+getCourse();
	//alert("SAPath: "+strSAPath);
	

	var URL = g_iUseSAGlossary == 1 ? strPath + strSAPath : strPath + "glossary/glossary.html";

	
	if (glossaryWindow == null || glossaryWindow.closed)
	{
		var theHeight = g_iUseSAGlossary == 1 ? 500 : InternetExplorer ? screen.availHeight*0.7 : Math.floor(((screen.height)-taskBarHeight)*0.7);

		var theWidth = g_iUseSAGlossary == 1 ? 445 : 520;
		var strResizable = g_iUseSAGlossary == 1 ? "no" : "yes";
		var strScrollbars = g_iUseSAGlossary == 1 ? "no" : "yes";
		var windowProperties = "top=50,left=30,resizable="+strResizable+",scrollbars="+strScrollbars+",height="+theHeight+",width="+theWidth;
		glossaryWindow=window.open(URL, "glossaryWin", windowProperties);
		glossaryWindow.focus();
	}
	else 
		glossaryWindow.focus();
}

function openCountingBlocks(in_iCourseNum, in_iModuleNum)
{
	var szParList = EncodeChars("swf=countingblocks/countingblocks.swf&title=Counting Blocks&var1="+in_iCourseNum+"&var2="+in_iModuleNum);
	openManipulative(szParList)
}

function openPlaceVal(in_iCourseNum, in_iModuleNum)
{
	var szParList = EncodeChars("swf=placeval/placeval.swf&title=Place Value&var1="+in_iCourseNum+"&var2="+in_iModuleNum);
	openManipulative(szParList)
}

function CloseWin(in_objWin)
{
	var bClosed = false;
	if (in_objWin != null && ! in_objWin.closed)
	{
		in_objWin.close();
		bClosed = true;
	}
	return bClosed;
}

function GetParList(in_objWin)
{
	var szLocation = new String(in_objWin.location);
        var szReturn = new String();
        var ix = szLocation.length;
        while (ix > 0 && szLocation.substr(ix - 1, 1) != '?')
        {
                szReturn = szLocation.substr(ix - 1, 1) + szReturn;
                ix--;
        }

        if (ix > 0)
             return szReturn
        else
             return "";
}

function NewLocation(in_objWin, in_szParList)
{
       return (in_objWin == null || in_objWin.closed || GetParList(in_objWin) != in_szParList);
}

function openManipulative(in_szParList)
{
// in_szParList is list of pars (including (optionally) swf
// (path relative to manip.html), title, bgcolour, var1..n)

// NOTE: function opens "manipWindow", could be modified
// to accept window as par

	g_szParList = in_szParList; // needs to be global cos MacPlatform browsers
					// can't close then immediately open a window
					// so use setTimeout and check status (setTimeout
					// function can't accept parameters). The check
					// window status also can't be done in same block
					// of code (i.e. can't wait till closed then open)

        if (NewLocation(manipWindow, in_szParList))
	{
		CloseWin(manipWindow);
		setTimeout("ShowManip()",100);
	}
	else
		manipWindow.focus();
	

}

function ShowManip()
{
   	var theHeight = InternetExplorer ? screen.availHeight : (screen.height)-taskBarHeight;
    	var theWidth = InternetExplorer ? screen.availWidth : screen.width;
    	var windowProperties = "top=0,left=0,resizable=no,scrollbars=no"; 
    	var args = getArgs(g_szParList, "&");
	var strRelativeRoot = (g_bSCORM || g_bCSRTE) ? "" : relativeRoot;
    	var strPath = (ActivityType == "U") ? relativeRoot.substring(0, relativeRoot.length - 3) : strRelativeRoot;
    	var URL = strPath + "manip.html?" + g_szParList;
    

    	if(args.height)
       		theHeight = args.height;
    	if(args.width)
       		theWidth = args.width;
    	windowProperties = windowProperties+",height="+theHeight+",width="+theWidth;
	

	while(manipWindow != null && ! manipWindow.closed); // loop till closed

	manipWindow = window.open(URL, "manipWin", windowProperties);
		
	if (MacPlatform && InternetExplorer)
		manipWindow.resizeTo(theWidth, theHeight);
	manipWindow.focus();

}


function openCalculator()
{
var URL = relativeRoot + "Calculator.html";
	if (calculatorWindow == null || calculatorWindow.closed)
	{
		var windowProperties = "top=50,left=50,resizable=no,height=220,width=420";	
		calculatorWindow=window.open(URL, "calculatorWin", windowProperties);
		calculatorWindow.focus();
	}
	else
		calculatorWindow.focus();
}

function openWin(in_strURL)
{
	g_strDynamoSessionID = "";
	g_iDynamoUserID = UserID;
	//alert("URL: "+in_strURL);
	openProductWindow(in_strURL, 0);
}

function openProductWindow(in_strURL, in_iAssignmentID)
{
	var theHeight = InternetExplorer ? screen.availHeight : (screen.height)-taskBarHeight;
	var theWidth = InternetExplorer ? screen.availWidth : screen.width;
	var windowProperties = "top=0,left=0,resizable=no,scrollbars=no,height="+theHeight+",width="+theWidth;
	var theURL = in_strURL + g_strDynamoSessionID +"?USERID=" + g_iDynamoUserID + "&ASSIGNID=" + in_iAssignmentID;
	//alert("URL: "+theURL);
	sessionWindow=window.open(theURL, "sessionWin", windowProperties);
	if (MacPlatform && InternetExplorer)
		sessionWindow.resizeTo(theWidth, theHeight);
	sessionWindow.focus();
}


/***************************** LAN-specific functions ************************/

function updateLANProgress (Actid, bid, rkp, hkp, tkp, s, ns, is, in_bLastUpdate)
{
	// default ppath for testing
	if (ppath == "")
	{
		if(MacPlatform)
			ppath = "/Macintosh HD/temp/ProgressPipeG.dat";
		else
			ppath = "C:/temp/progress.txt";
	}

	// strip quotes if necessary
	if (ppath.charAt (0) == '\'')
		ppath = ppath.substring (1, ppath.length - 1);

	
	
	var lanRkp;
	if (in_bLastUpdate)
		lanRkp = eval(rkp);
	else
		lanRkp = -1;

		// Load progress applet / MRJ plugin in hidden frame
		var theLayerObj = InternetExplorer ? progressFrame : document.dummyProgress;
		if (MacPlatform)				// create new applet in hidden frame with all parameters
		{
			if (InternetExplorer)
				var LANProgressPath = relativeRoot+"IE_Mac/ProgressUpdate.html";
			else
				var LANProgressPath = relativeRoot+"Netscape_Mac/ProgressUpdate.html";		
		}
		else
		{
			if (InternetExplorer)
				var LANProgressPath = relativeRoot+"IE/ProgressUpdate.html";
			else
				var LANProgressPath = relativeRoot+"Netscape/ProgressUpdate.html";		
		}
			
		var theQuery = LANProgressPath+"?ppath='"+ppath+"'&Actid="+Actid+"&bid="+bid+"&rkp="+lanRkp+"&hkp="+hkp+"&hkp="+hkp+"&tkp="+tkp+"&s="+s+"&ns="+ns+"&is="+is;	

		var winProperties = "top=5,left=5,height=40,width=200,menubar=no,status,scrollbar=no";
		var updateWindow=window.open(theQuery, "updateWin", winProperties);
		updateWindow.focus();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NEW SCORM STUFF:

// define global var as handle to API object
var mm_adl_API = null;
// mm_getAPI, which calls findAPI as needed
window.status = 'script 1';
function getAPI(in_win)
{
	var myAPI = null;
	var iScormType = -1; // version of SCORM (-1 = no scorm)
	var tries = 0, triesMax = 500;
  	while (tries < triesMax && myAPI == null)
  	{
		myAPI = findAPI_2(window);
		if(myAPI == null)
		{
			myAPI = findAPI_1(window);
		} 
		else
		{
			iScormType = 2;
		}
   	 	if (myAPI == null && typeof(window.parent) != 'undefined')
		{ 
			myAPI = findAPI_2(window.parent);
			if(myAPI == null)
			{
				myAPI = findAPI_1(window.parent);
			}
			else
			{
				iScormType = 2;
			}
		}
   	 	if (myAPI == null && typeof(window.top) != 'undefined')
		{ 
			myAPI = findAPI_2(window.top);
			if(myAPI == null)
			{
				myAPI = findAPI_1(window.top);
			}
			else
			{
				iScormType = 2;
			}			
		}
   	 	if (myAPI == null && typeof(window.opener) != 'undefined')
		{ 
			if (window.opener != null && !window.opener.closed)
			{ 
				myAPI = findAPI_2(window.opener);
				if(myAPI == null)
				{
					myAPI = findAPI_1(window.opener);
				}
				else
				{
					iScormType = 2;
				}				
			}
		}
    		tries++;
  	}
	g_iScormType = (myAPI && iScormType == -1) ? 1 : iScormType;
	return myAPI;
}
function mm_getAPI()
{
	if(g_bSCORMOff)
	{
		return 0;
	}

  	var myAPI = null;
  	//var tries = 0, triesMax = 500;
	window.status = 'mm_getAPI()...';
	myAPI = getAPI(window);


	var iRetVal = (typeof g_bSCO == "undefined") ? 0 : g_bSCO;

  	if (myAPI == null)
  	{
    		window.status = 'API not found';
    		//alert('JavaScript Warning: API object not found in window or opener.');
  	}
  	else
  	{
    		mm_adl_API = myAPI;
    		window.status = 'API found, type: ' + g_iScormType;
		iRetVal = 1;
  	}
	return iRetVal;
}
// returns LMS API object (or null if not found)
function findAPI_OLD(win)
{
  // look in this window
  if (typeof(win) != 'undefined' ? typeof(win.API) != 'undefined' : false)
  {
    if (win.API != null )  return win.API;
  }
  // look in this window's frameset kin (except opener)
  if (win.frames.length > 0)  for (var i = 0 ; i < win.frames.length ; i++);
  {
    if (typeof(win.frames[i]) != 'undefined' ? typeof(win.frames[i].API) != 'undefined' : false)
    {
	     if (win.frames[i].API != null)  return win.frames[i].API;
    }
  }
  return null;
}
/*******************************************************************************
**
** Function findAPI(win)
** Inputs:  win - a Window Object
** Return:  If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API in parent and opener windows
**
*******************************************************************************/
function findAPI_2(win)
{

   	return win.API_1484_11;
}
function findAPI_1(win)
{

   	return win.API;
}
g_bSCORM = mm_getAPI();
/*
if(g_bSCORM)
{
	// get the API
	mm_getAPI();
}
*/
var showLmsWarn = true ;
//window.status = 'script 2';
// Handle FSCommand messages from a Flash movie
function kControl_DoFSCommand(command, args)  {

  var myArgs = new String( args );
  //var kControlObj = InternetExplorer ? kControl : document.kControl;
  var kControlObj = (document.kControl == null)  ? window.kControl : document.kControl;

  // all 'LMS' calls handled here
  if (mm_adl_API != null && command.substring(0,3) == "LMS")
  {
    	var err = 1;
    	var sep, arg1, arg2, value;

	if( command == "LMSInitialize" )
	{
		err = g_iScormType == 1 ? mm_adl_API.LMSInitialize("") : mm_adl_API.Initialize( myArgs );
	}
	else if ( command == "LMSSetValue" )
	{
          		sep = myArgs.indexOf(",");
          		arg1 = myArgs.substr(0, sep);
          		arg2 = myArgs.substr(sep+1);
		err = g_iScormType == 1 ? mm_adl_API.LMSSetValue(arg1,arg2) : mm_adl_API.SetValue(arg1,arg2);
		//err = eval('mm_adl_API.SetValue(\"' + arg1 + '\",\"'+arg2+'\")');

        	}
	else if ( command == "LMSFinish" )
	{
		err = g_iScormType == 1 ? mm_adl_API.LMSFinish("") : mm_adl_API.Terminate(args);
		//err = g_iScormType == 1 ? LMSFinish(1): LMSFinish(2,args);
	}
	else if ( command == "LMSCommit" )
	{
		err = g_iScormType == 1 ? mm_adl_API.LMSCommit(args) : mm_adl_API.Commit(args);
	}
	else if ( command == "LMSFlush" )
	{
		err = g_iScormType == 1 ? mm_adl_API.LMSFlush(args) : mm_adl_API.Flush(args);
	}
	else if ( command == "LMSGetValue" )
	{
         		 // for LMSGetValue,LMSGetLastError,LMSGetErrorString,LMSGetDiagnostic, or ??
         		sep = myArgs.indexOf(",");
         		arg1 = myArgs.substr(0, sep);
         		arg2 = myArgs.substr(sep+1);
		value = g_iScormType == 1 ? mm_adl_API.LMSGetValue(arg1) : mm_adl_API.GetValue(arg1);
         		//value = eval('mm_adl_API.GetValue(\"' + arg1 + '\")');
		var errCode = g_iScormType == 1 ? mm_adl_API.LMSGetLastError().toString() : mm_adl_API.GetLastError().toString();
      		//var errCode = mm_adl_API.GetLastError().toString();


         		if (sep != 0 && arg2 != "")  kControlObj.SetVariable(arg2,value);
         		else err = "-2: No Flash variable specified";
	}
	else
	{
          		// for LMSGetValue,LMSGetLastError,LMSGetErrorString,LMSGetDiagnostic, or ??
         		sep = myArgs.indexOf(",");
         		arg1 = myArgs.substr(0, sep);
         		arg2 = myArgs.substr(sep+1);
         		value = eval('mm_adl_API.' + command + '(\"' + arg1 + '\")');
         		if (sep != 0 && arg2 != "")  kControlObj.SetVariable(arg2,value);
         		else err = "-2: No Flash variable specified";
	}

   	 // handle LMS error returns
    	if ((err == 0 || err == "false") && showLmsWarn)  {
      		if (! confirm('LMS API adapter returns error code: ' + err + '\rWhen calling API.' + command + 'with ' + args + '\r\rSelect cancel to disable future warnings'))  showLmsWarn = false;
    	}
  } // end of 'LMS' handling if
  else
   {
	if(command == "sendDebug" && g_bWriteDemoData)
	{
		//alert("hello");
		document.debugSWF.SetVariable("szDebug",args)
		document.debugSWF.TCallLabel("/","writeData");
		
	}

   }

}





/***************************** Script for Flash commands on IE ************************/

if (navigator.appName && InternetExplorer && 
	  navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	document.write('<SCRIPT LANGUAGE=VBScript\> \n');
	document.write('on error resume next \n');
	document.write('Sub kControl_FSCommand(ByVal command, ByVal args)\n');
	document.write('  call kControl_DoFSCommand(command, args)\n');
	document.write('end sub\n');
	document.write('</SCRIPT\> \n');
}
