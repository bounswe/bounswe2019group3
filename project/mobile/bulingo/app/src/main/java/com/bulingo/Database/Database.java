package com.bulingo.Database;

public class Database {

    //Register icin(username alinmis mi diye) ve log in icin
    public boolean checkUserNameDatabase(String username, String password){

        return true;
    }

    //Bu email ile daha once register olan var mi diye
    public boolean checkEMailDatabase(String email){

        return false;
    }

    //Gonderilen bilgiler bos gelmiyor, kontrol ediyorum. Yukaridaki fonksiyonlari kullanarak
    //username ve email alinmis mi diye de kontrol ediyorum. Database de kullanici olusturman yeterli.
    public boolean createUserInDatabase(String fullName, String email, String username, String password){

        return true;
    }

    //Simdilik void biraktim, profil icin(bio,avatar,email,rating vs) bilgilerin bir format belirlenip alinmasi gerek.
    public void getProfileInfo(String username){

    }

}
