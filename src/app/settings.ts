export const languages=[
    {value: 'c_cpp',viewValue :'c++'},
    {value: 'python',viewValue :'python'},
    {value: 'java',viewValue :'java'},
    {value: 'golang',viewValue :'golang'},
    {value: 'javascript',viewValue :'nodejs'},
    {value: 'csharp',viewValue :'c#'}
  ]
  export const themes=[
    {value: 'eclipse',viewValue :'eclipse'},
    {value: 'monokai',viewValue :'monokai'},
    {value: 'solarized_light',viewValue :'solarized light'},
    {value: 'dracula',viewValue :'dracula'}
  ]
  export const fontSize=[
    {value:(15*0.5).toString()+"px",viewValue:'0.5x'},
    {value:(15*0.75).toString()+"px",viewValue:'0.75x'},
    {value:'15px',viewValue:"1x"},
    {value:(15*1.25).toString()+"px",viewValue:'1.5x'},
    {value:(15*1.75).toString()+"px",viewValue:'1.75x'}
  ]

export const languageMap={
    "csharp":{version:"2",apivalue:"csharp"},
    "c_cpp":{version:"2",apivalue:"cpp14"},
    "python":{version:"2",apivalue:"python3"},
    "java":{version:"2",apivalue:"java"},
    "golang":{version:"2",apivalue:"go"},
    "javascript":{version:"2",apivalue:"nodejs"}
}
export const starterCode={
    "javascript":
        `function solution(){
            console.log("hello world")
        }
        solution()`,
    "csharp":
        `using System; 
         namespace HelloWorldApp { 
            class Solution { 
            static void Main(string[] args) {
                    Console.WriteLine("Hello World!");              
                    Console.ReadKey(); 
                } 
            } 
        } `,
     "c_cpp":
        `#include<iostream>
        using namespace std;
        int main(){
            cout<<"hello"<<endl;
        }`,
     "python":
        `def solution():
            print("hello world")
         solution();
    `,
    "java":
        `public class Solution{
            public static void main(String args[]){
                System.out.println("hello world");
            }
        }
        `,
    "golang":
        `package main
        import "fmt"
        func main() {
            fmt.Println("hello world")
        }`      
    
}
