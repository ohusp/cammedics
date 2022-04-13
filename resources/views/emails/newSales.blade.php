@component('mail::message')
<table style="width:100%">
    <tr>
        <td>
            <br><h2>{{ $emailDetails['title'] }}</h2>
        </td>
    </tr>
</table>
<p>Hello {{ $emailDetails['name'] }}<p><br>
<p>You have a new sales on CamMedics from </p>
<hr>
@component('mail::table')
<table style="width:100%">
  <tr>
    <th style="float: left; padding-top: 10px;">Userame:</td>
    <td>{{ $emailDetails['patient_username'] }}</td>
  </tr>
  <tr>
    <th style="float: left; padding-top: 10px;">Name:</td>
    <td>{{ $emailDetails['patient_name'] }}</td>
  </tr>
  <tr>
    <th style="float: left; padding-top: 10px;">Time:</td>
    <td>{{ $emailDetails['time'] }}</td>
  </tr>
  <tr>
    <th style="float: left; padding-top: 10px;">Total:</td>
    <td>{{ $emailDetails['currency'] }} {{ $emailDetails['total'] }}</td>
  </tr>
</table>
<hr>

@endcomponent


<span style="font-size: 12px">Powered by: <span style="color: #ca333a">Cam</span><span style="color: #2167ac">Medics</span></span>
@endcomponent