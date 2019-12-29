#include <cpprest/http_client.h>
#include <cpprest/json.h>

using namespace web;
using namespace web::http;
using namespace web::http::client;

#include <iostream>
using namespace std;

json::value response;
void setResponseJson(json::value const & v) {
	response = v;
}
json::value make_request(std::string req)
{	
	utility::string_t query;
	
	std::string str1 = "/api/2701365683253405/346";
	std::string str2 = "/api/2701365683253405/149";
	std::string str3 = "/api/2701365683253405/314";
	std::string str4 = "/api/2701365683253405/332";
	std::string str5 = "/api/2701365683253405/659";
	std::string str6 = "/api/2701365683253405/70";
	std::string str7 = "/api/2701365683253405/644";
	std::string str8 = "/api/2701365683253405/265";
	std::string str9 = "/api/2701365683253405/720";
	std::string str10 = "/api/2701365683253405/38";
	if (req == str1) {
		query = uri_builder(L"/api/2701365683253405/346").to_string();
	}else if (req == str2) {
		query = uri_builder(L"/api/2701365683253405/149").to_string();
	}
	else if (req == str3) {
		query = uri_builder(L"/api/2701365683253405/314").to_string();
	}
	else if (req == str4) {
		query = uri_builder(L"/api/2701365683253405/332").to_string();
	}
	else if (req == str5) {
		query = uri_builder(L"/api/2701365683253405/659").to_string();
	}
	else if (req == str6) {
		query = uri_builder(L"/api/2701365683253405/70").to_string();
	}
	else if (req == str7) {
		query = uri_builder(L"/api/2701365683253405/644").to_string();
	}
	else if (req == str8) {
		query = uri_builder(L"/api/2701365683253405/265").to_string();
	}
	else if (req == str9) {
		query = uri_builder(L"/api/2701365683253405/720").to_string();
	}
	else if (req == str10) {
		query = uri_builder(L"/api/2701365683253405/38").to_string();
	}
	else {
		query = uri_builder(L"/api/2701365683253405/70").to_string();
	}
	
	http_client client(U("https://superheroapi.com"));
	
		
	client.request(methods::GET, query)
		.then([](http_response response)
	{
		// if the status is OK extract the body of the response into a JSON value
		// works only when the content type is application\json
		if (response.status_code() == status_codes::OK)
		{
			return response.extract_json();
		}

		// return an empty JSON value
		return pplx::task_from_result(json::value());
	})
		.then([](pplx::task<json::value> previousTask)
	{
		// get the JSON value from the task and display content from it
		try
		{
			json::value const & v = previousTask.get();
			setResponseJson(v);
		}
		catch (http_exception const & e)
		{
			wcout << e.what() << endl;
		}
	})
		
		.wait();
	return response;
}
