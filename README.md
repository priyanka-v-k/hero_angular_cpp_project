# hero_angular_cpp_project
A web app which uses Angular JS in the front end and CPP (CPP Rest SDK ) in the backend.

Pre requisites:
1) Git
2) Node js
3) Visual Studio 2017 or higher [Include Desktop development with C++]
4) Visual Studio Code
5) CMake GUI which uses Ninja Build System


CPP Rest SDK:

Steps to run 
1) Clone the project to any desired path
2) Install vcpkg in windows 
3) Clone the vcpkg repo from GitHub: https://github.com/Microsoft/vcpkg. You can download to any folder location you prefer.

Run the bootstrapper in the root folder:

.\bootstrap-vcpkg.bat 

Afterwards, install the cpprest SDK in the same powershell path that you installed vcpkg in, using the below command,

.\vcpkg install cpprestsdk cpprestsdk:x64-windows

This will take a while.

For usage in Visual Studio you have to enable the system wide integration with,

.\vcpkg integrate install

2) Open Cmake and delete cache if any and set the following,

where is the source code : Path containing the cloned folder HeroesCmakeProject,
where to build the binaries : Path containing the cmake bin ("C:/Vcpkg/vcpkg/downloads/tools/cmake-3.14.0-windows/cmake-3.14.0-win32-x86/bin")

Then Click on Configure,

In the popup that appears,
- Specify the generaot for this project : Visual Studio 15 2017
- Choose 'Use default native compilers' option.

Once configuration is done, add an entry as below
Name : cpprestsdk_DIR
Path : your vcpkg path of cpprestsdk (C:/Vcpkg/vcpkg/buildtrees/cpprestsdk)

Now, click on Generate.

Once Generation is done, click on Open Project.

Now the Project opens in Visual Studio 15 2017.

Set debug points and click on "Local Windows Debugger".

Now the server begins to listen..


Angular JS:

Steps to run 
1) Clone the project to any desired path
2) Open node.js command prompt
3) Change the path to where you have cloned the project and then further to 'angular' and type the following command

npm install

The above command installs the needed dependencies, and creates a folder called node_modules under your project folder.
4) once dependencies have been installed, to start the application use the following command
 
 npm start

5) The app will then be available on 

 "http://localhost:8000"

 6) To edit the app, you could use Visual Studio Code. It also has a built in node terminal.
 
 [Note:Run chrome as "chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security" from command prompt to avoid CORS issue"]


 

