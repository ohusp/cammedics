@component('mail::message')
# {{ $emailDetails['title'] }}
Hello {{ $emailDetails['username'] }} <br>
Thank you for your support.<br><br>
Here is your passcode(s) for the concert <br>
<?php
    $concertCodeArray = implode(",", $emailDetails['concert_code']);
    // return gettype($concertCodeArray);
?>
    
@foreach(explode(',', $concertCodeArray) as $concert_code) 
| <span style="color: #2167ac">{{$concert_code}}</span> |
@endforeach

<hr>

HOW TO JOIN THE CONCERT<br></br>
* Go to https://dashboard.cammedics.com<br>
* Login with your username and password<br>
* Click on Spread the Love Concert on the sidebar on your dashboard<br>
* Click on join concert<br>
* Enter your passcode<br>

<br></br>
<hr>

If you have any question, please contact us on support@cammedics.com or call +234 816 525 3939, +186 9765 1697, +234 806 894 8689 (WhatsApp).

Thanks,

<span style="font-size: 14px"><span style="color: #ca333a">Cam</span><span style="color: #2167ac">Medics</span></span>
@endcomponent