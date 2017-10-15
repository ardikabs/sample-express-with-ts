
import * as EventEmitter from "events";
import * as fetch from "node-fetch";
import * as crypto from "crypto";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as FormData from "form-data";
import * as withQuery from "with-query";
interface customHeaders {
    username:string,
    password:string
}

class BitlyAPI extends EventEmitter{
    
    headers:any;
    endpoint :string;
    access_token :string;

    constructor(public options){
        super();
        this.options = options || {};
        this.options.clientId = options.clientId || "";
        this.options.clientSecret = options.clientSecret || "";
        this.endpoint = 'https://api-ssl.bitly.com';

        this.headers={
            Accept:"application/json",
            "Content-Type":"application/json"        
        };

    }

    authenticate(username:string, password:string){
        
        if(!this.options.clientId || !this.options.clientSecret){
            console.log("Error, You must specify client id and client secret before authenticating");
        }
        let headers = {
            Authorization:"Basic "+ btoa(this.options.clientId+":"+this.options.clientSecret)
        };

        let form = new FormData();
        form.append('grant_type','password');
        form.append('username',username);
        form.append('password',password);


        return fetch(this.endpoint + "/oauth/access_token",{method: "POST", headers:headers,body:form})
            .then((res)=>{
                return res.json();
            })
            .then((json)=>{
                this.setAccessToken(json.access_token);
                this.setCustomLink("http://bit.ly/2yL1S9B","")
            });

    }

    shorten(longUrl:string){
        
        let path = withQuery("/v3/shorten",{
            access_token : this.access_token,
            longUrl : longUrl    
        });

        return this.get(path).then((res)=>{
            return res.json();
        })
    }

    expand(shortUrl:string){
        let path = withQuery("/v3/expand",{
            access_token : this.access_token,
            shortUrl : shortUrl    
        });

        return this.get(path).then((res)=>{
            return res.json();
        })
    }

    setCustomLink(bitlink:string, custom:string){

        let path = withQuery("/v3/user/save_custom_domain_keyword",{
            access_token:this.access_token,
            target_link:bitlink,
            keyword_link: custom
        });
        
        return this.get(path).then((res)=>{
            return res.json();
        });

    }

    lookup(){
        
    }
    
    setAccessToken(access:string){
        this.access_token = access;
    }

    get(path){
		return fetch(this.endpoint + path, { method: 'GET', headers: this.headers});        

    }

    post(path,body){
		return fetch(this.endpoint + path, { method: 'POST', headers: this.headers, body: JSON.stringify(body) });        
    }

}

function btoa(str) {
    if (Buffer.byteLength(str) !== str.length)
      throw new Error('bad string!');
    return new Buffer(str, 'binary').toString('base64');
  }

export default BitlyAPI;



