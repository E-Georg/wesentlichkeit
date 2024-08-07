<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class ClientTopicClassificationCategorization extends Model
// {
//     use HasFactory;

//     protected $table = 'wa_clientTopicClassificationCategorization';

//     protected $fillable = [
//         'clientId',
//         'active',
//         'clientTopicClassificationId',
//         'topicClassificationCategorizationId',
//         'topicClassificationCategorizationValue',
//         'topicClassificationCategorizationText',
//     ];



//     public function classification()
//     {
//         return $this->belongsTo(ClientTopicClassification::class, 'clientTopicClassificationId', 'id');
//     }

//     public function categorizationValues()
//     {
//         return $this->belongsTo(TopicClassificationCategorizationValues::class, 'topicClassificationCategorizationId', 'id');
//     }
// }


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientTopicClassificationCategorization extends Model
{
    use HasFactory;

    protected $table = 'wa_clientTopicClassificationCategorization';

    protected $fillable = [
        'clientId',
        'active',
        'clientTopicClassificationId',
        'topicClassificationCategorizationId',
        'topicClassificationCategorizationValue',
        'topicClassificationCategorizationText'
    ];

    public function classification()
    {
        return $this->belongsTo(ClientTopicClassification::class, 'clientTopicClassificationId');
    }

    public function categorizationvalues()
    {
        return $this->belongsTo(TopicClassificationCategorization::class, 'topicClassificationCategorizationId');
    }
}
