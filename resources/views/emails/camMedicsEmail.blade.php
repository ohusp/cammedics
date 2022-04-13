@component('mail::message')
<table style="width:100%">
    <tr>
        <td>
            <br><h2>{{ $emailDetails['subject'] }}</h2>
        </td>
    </tr>
</table>
<!-- send as html n not string -->
{!! $emailDetails['message'] !!}

<hr>


<span style="font-size: 12px">Powered by: <span style="color: #ca333a">Cam</span><span style="color: #2167ac">Medics</span></span>
@endcomponent