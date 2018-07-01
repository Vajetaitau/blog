Eini per žemėlapį, ir turi tris šuolius, su šuoliu gali peršokti sieną. Daugiausia gali turėti tris šuolius. 
Kad gautum šuolį, reikia nušauti žmogų. Žaidimo tikslas yra nueiti kuo toliau.

Žemėlapis turėtų būti konstruojamas iš flex box blokų, kurie turėtų atitinkamus borderius. Tai "gaaal" padarys,
kad viskas būtų responsive.

Būtų smagu, jeigu įrašytume kiekvieną bandymą nueiti kažkokį tai atstumą. Ir galėtume tiesiog iš duombazės atkartoti
visus darytus žingsnius. Tai padėtų vėliau prijungus serverių karus parodyti, kodėl kažkuris iš serverių laimėjo.

Visiems patinka, jeigu galima kažką žaidime sukurti, kas būtų "permenant". Kad simuliuotų gyvenimo jausmą. Tai, kas
jeigu būtų galima pastatyti sienas bei patrankas (arba kažką tokio, kas galėtų blokuoti kokį nors praėjimą). Patrankos
galėtų šaudyti į tik į vieną pusę. Joms pastatyti reikėtų "šuolių valiutos". Šuolių valiutą galėtumėme vadinti sielomis,
jas reikėtų pardavinėti, kokiam nors velniui ir jis parduotų patrankas. Jeigu sunaikini patrankas, gauni pusę kainos,
kiek reikėjo ją pastatyti. Reikia taip pat sugalvoti, kokia nauda iš tų fortų? Negi tik kelio blokavimas? Nes galima 
lengvai peršokti sieną, kurioje tik nori vietoje ir tas fortas bus ne į temą. Vienas iš dalykų, kam fortas gali būti,
naudojamas, yra tam, kad jeigu fortas ką nors nušauna, tas žaidėjas ar komanda gauna sielą. Gal dar fortai galėtų saugoti
prisitukinimo punktus.

Jeigu įstoji į komandą, tai visi esantys komandoje, tampa "draugai", o visi ne komandoje yra "priešai". Jeigu nori išstoti iš
komandos, pasilieki žaidime, tačiau pradedi nuo pradinio taško ir turi tik tris sielas. Tačiau išsaugoji visus savo ištobulintus
gebėjimus.

Gebėjimai gali būti atstumas, kuriuo matai į tolį. Greitis kokio aukščio sieną gali pastatyti (bet šitas toks abejotinas). Kiek
toli gali numesti granatą ar dar ką nors, kas galėtų sunaikinti patranką. Reikia sugalvoti, kaip padaryti tai, kad neapsimokėtų
statyti patrankų prie pradinio regiono, kur atsiranda nauji žaidėjai. Ir padaryti taip, kad jie galėtų kaip nors patobulėti ir
nebūtų pastoviai sprogdinami.

Labirinto generavimo algoritmas:

Reikalavimai: 
1) labirintas turi būti begalinis, taigi labirintas turi būti generuojamas, kai žmonės priartėja prie ribos, kur dar niekas nebuvo.
2) labirintas turi būti ganėtinai uždaras, ir keliai turėtų būti gana ilgi. Keliai turėtų viniotis aplinkui ir kuo mažiau plėsti.

## Kaip veikia generavimas:
1. pradedama nuo taško (0, 0)
2. gauname galimus ėjimo variantus, juos vadiname `Options`:
    1. pasižiūrime į aplink esančius taškus: `NORTH`, `SOUTH`, `EAST`, `WEST`
    2. surenkame visas puses, kurių būsena yra `OPEN`:
    3. patikriname lentelėje `backtrack_info` ar surinktos pusės atitinka
    ėjimo toliau reikalavimus:
        1. reikia, kad tos krypries būsena būtų `NOT_VISITED_CHILD`
3. jeigu yra galimų ėjimų:
    1. pritaikome tikimybinius koeficientus atsižvelgdami į mūsų norimo
    pasiekti taško koordinates
    2. pritaikome tikimybinius koeficientus:
        1. TODO
    3. gauname atsitiktinį ėjimą
    4. į lentelę `labyrinth` įterpiame tašką esantį toje pusėje:
        1. įterpdami patikriname ar šalia esančiuose taškuose kažkas yra
        2. jeigu tuose taškuose kažkas yra, tų pusių būsenos tampa `CLOSED`,
        nebent tai yra ta pusė iš kurios atėjome
    5. į lentelę `backtrack_info` įterpiame tašką esantį toje pusėje:
        1. tos pusės būsena iš kurios atėjome, tampa `PARENT`
        2. tos pusės, kurių būsena lentelėje `labyrinth` yra `CLOSED` taip
        pat pažymimos būsena `CLOSED`
        3. visos kitos pusės pažymimos `NOT_VISITED_CHILD`
4. jeigu nėra galimų ėjimų:
    1. gauname tėvinį tašką:
        1. iš lentelės `backtrack_info` randame, kurioje pusėje yra būsena
        `PARENT`
        2. apskaičiuojame koordinates ir iš lentelės `labyrinth` gauname
        tėvinį tašką
    2. pažymimę tą pusę iš kurios atėjome `backtrack_info` lentelėje, kaip
    `VISITED_CHILD`, tai reiškia, kad į šią šaką, jau negrįšime
    3. pradedame iš pradžių nuo punkto (2.)