#include "HeroesCMakeProject.h";
#include <cpprest/http_listener.h>
#include <cpprest/json.h>


using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

#include <iostream>
#include <map>
#include <set>
#include <string>
using namespace std;

#define TRACE(msg)            wcout << msg
#define TRACE_ACTION(a, k, v) wcout << a << L" (" << k << L", " << v << L")\n"
void handle_post(http_request);



/* handlers implementation */

void handle_post(http_request request)
{
	json::value temp;
	pplx::task<utility::string_t> body_json = request.extract_string();
	std::string jsonstr = utility::conversions::to_utf8string(body_json.get());
	cout << jsonstr << endl;
	std::string path = "";
	int cnt = 0;
	for (char& c : jsonstr) {
		if (cnt && c == '\"') {
			break;
		}
		if (c == '/') {
			cnt = 1;
		}
		if (cnt) {
			path += c;
		}

	}
	cout << path << endl;
	//do whatever you want with 'temp' here
	http_response response(status_codes::OK);
	response.headers().add(U("Allow"), U("GET, POST, OPTIONS"));
	response.headers().add(U("Access-Control-Allow-Methods"), U("GET, POST, OPTIONS"));
	response.headers().add(U("Access-Control-Allow-Headers"), U("Content-Type"));
	response.headers().add(U("Access-Control-Allow-Origin"), U("*"));

	response.set_body(make_request(path));

	request.reply(response);
}


int main()
{
	http_listener listener(L"http://localhost:3000");

	
	listener.support(methods::POST, handle_post);

	try
	{
		listener
			.open()
			.then([&listener]() {TRACE(L"\nstarting to listen\n");})
			.wait();

		while (true);
	}
	catch (exception const & e)
	{
		wcout << e.what() << endl;
	}

	return 0;
}
	
	

