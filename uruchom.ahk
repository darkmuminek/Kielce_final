SetTitleMatchMode, 2
if WinExist("Centrum Edukacji Medialnej w Kielcach")
	WinActivate
Sleep, 10000
ControlClick, x945 y253, Centrum Edukacji Medialnej w Kielcach
Sleep, 5000
SendInput, !1
return