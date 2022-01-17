<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\withMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithHeadings;

class FinalAccountExport implements FromArray , withMapping , WithEvents,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $rows ;
    
    public function __construct(array $rows)
    {
        $this->rows= $rows;
    }
    
    function array():array{
        return $this->rows;
    }
    
    public function map ($row):array{
        return[
            $row['debitBalance'],
            $row['accountNameAndIndexD'],
            $row['creditBalance'],
            $row['accountNameAndIndexC'],

        ];       
            
    }
    
      public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $event->sheet->getDelegate()->setRightToLeft(true);
            },
        ];
    }
    public function headings(): array
    {
        return [
            'مدين',
            'الحساب',
            'دائن ',
            'الحساب ',
            
        ];
    }
}
