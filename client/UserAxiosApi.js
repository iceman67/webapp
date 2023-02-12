import React, { useState,useEffect } from 'react';
import axios from 'axios';

function User({ user }) {
    return (
      <div style ={ {marginTop: '30px', marginLeft: '30px', pxdisplay : 'flex', flexWrap: 'wrap'}}>
        <span> {user.id}</span> <b>{user.name}</b> <span>({user.email})</span>
      </div>
    );
  }

function AxiosApi() {
    const baseURL = "http://localhost:8000/users";
    // users, setUsers 비구조화 할당
    let [users, setUsers] = useState([]);
    let [loading, setLoading] = useState(false);
    const TIME_INTERVAL = 5000;

    // useEffect에서는 함수를 반환 할 수 있는데 이를 cleanup 함수라고 부름
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
      }, []);
  
    // PROBLEM : continuous loop 
    /*
    useEffect(() => {
        console.log ("User has been changed");
        axios.get(baseURL).then((response) => {
            setUsers(response.data);
        })
    }, [users]);
    */

    // Setting timer 
    // Memory leak problem 
    /*
    useEffect(() => {
        console.log ("User has been changed");
        axios.get(baseURL).then((response) => {
            //setUsers(response.data);
            console.log(response.data);
        })
    });
    setTimeout(searchApi, TIME_INTERVAL);
    */
   

   // Final version
   // deps 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출됨 
   useEffect(() => {
        console.log ("User has been changed");
        const handler = setTimeout( () => {
            searchApi()
        }, TIME_INTERVAL);
        return () => {clearTimeout(handler)};
    });
   
    const instance = axios.create({
        timeout: 5000,
      });
    // 통신 메서드
    function searchApi() {
        instance.get(baseURL)
        .then(function(response) {
            setUsers(response.data);
            setLoading(true);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
            setLoading(false);
        })
        
    }
    //users.sort();
    users.sort((a, b) => a.id - b.id);
   
    // 조회 데이터 존재할 경우
    if(users.length > 0) {
        return (
            users.map(user => (
                (user.id < 10) ? (
                    
                    <User user={user} />
                    )
                : null
            ))
        );
    } else { // 조회 데이터 존재하지 않을 경우
        return (
            <div>
                <button onClick={searchApi}> 불러오기 </button>
                {loading ? <p>연결성공</p> : <p>연결하세요</p> }
            </div>
           
        )
    }
}
export default AxiosApi;